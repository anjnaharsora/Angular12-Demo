import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {
  isRefreshed = false;
  pageTitle = '';
  isAdmin = false;

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    if (!this.isRefreshed) {
      this.authService.doLogout();
    }
  }

  constructor(public authService: AuthService,
              public commonUtilService: CommonUtilService,
              private userService: UserService,
              public router: Router) {
    this.commonUtilService.pageTitle.subscribe((title) => {
      this.pageTitle = title;
    });
    this.userService.userInfo.subscribe((res) => {
      if (res) {
        this.isAdmin = res?.isAdmin;
      } else {
        this.isAdmin = (JSON.parse(localStorage.getItem('currentUser')))?.isAdmin;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.doLogout();
  }

  ngOnDestroy() {
  }
}
