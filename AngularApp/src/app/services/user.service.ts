import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonUtilService } from '../shared/services/common-util.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  endpoint = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public userInfo: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              public router: Router,
              public commonUtilService: CommonUtilService) {
  }

  getUserProfile(id): Observable<HttpResponse<any>> {
    const api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get<any>(api, { headers: this.headers, observe: 'response' });
  }

  getUsers(): Observable<HttpResponse<User[]>> {
    const api = `${this.endpoint}/users`;
    return this.http.get<User[]>(api, { headers: this.headers, observe: 'response' });
  }

  updateUser(userId, payload): Observable<HttpResponse<any>> {
    const api = `${this.endpoint}/update-user/${userId}`;
    return this.http.put<any>(api, payload, {headers: this.headers, observe: 'response'});
  }

  deleteUser(userId): Observable<HttpResponse<any>> {
    const api = `${this.endpoint}/delete-user/${userId}`;
    return this.http.delete<any>(api, {headers: this.headers, observe: 'response'});
  }
}
