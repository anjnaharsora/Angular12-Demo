import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: ['user']
    });
  }

  ngOnInit() {
  }

  registerUser() {
    const payload = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      isAdmin: this.signupForm.value.isAdmin === 'admin',
    };
    this.authService.signUp(payload).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }
}
