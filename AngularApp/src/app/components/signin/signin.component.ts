import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { Subject } from 'rxjs';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  private readonly destroyed = new Subject<void>();

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private commonUtilService: CommonUtilService,
    private userService: UserService,
    public router: Router,
    private store: Store<State>,
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.userService.userInfo.next(res);
      if (res.isAdmin) {
        this.router.navigate(['product/allProducts']);
      } else {
        this.router.navigate(['product/products']);
      }
    }, ((error) => {
      this.commonUtilService.openSnackBar(error.statusText);
    }));
  }
}
