import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonUtilService } from './common-util.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router,
    public commonUtilService: CommonUtilService
  ) {
  }

  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = this.getToken();
    return (authToken !== null);
  }

  doLogout() {
    const removeToken: any = localStorage.removeItem('access_token');
    const removeUserId: any = localStorage.removeItem('currentUser');
    if (!removeToken && !removeUserId) {
      this.commonUtilService.pageTitle.next('');
      this.router.navigate(['log-in']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
