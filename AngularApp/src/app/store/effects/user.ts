import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes, GetAllUsers, GetUserProfile } from '../actions/user';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    public authService: AuthService,
    private userService: UserService,
    private productAPIService: ProductService) {
  }

  getUserProfile: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.GET_USER_PROFILE),
    switchMap((a: GetUserProfile) => {
      return this.userService.getUserProfile(a.payload)
        .pipe(
          map((response: HttpResponse<any>) => {
            return { data: response.body, status: response.status };
          }),
          catchError((error) => {
            return of({ data: undefined, status: error.status });
          })
        );
    }),
    map((userProfile: { data: any, status: number }) => ({ type: ActionTypes.SET_USER_PROFILE, payload: userProfile }))
  ));

  getAllUsers$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.GET_ALL_USERS),
    switchMap((a: GetAllUsers) => {
      return this.userService.getUsers()
        .pipe(
          map((response: HttpResponse<User[]>) => {
            return { data: response.body, status: response.status };
          }),
          catchError((error) => {
            return of({ data: undefined, status: error.status });
          })
        );
    }),
    map((allUsers: { data: User, status: number }) => ({ type: ActionTypes.SET_ALL_USERS, payload: allUsers }))
  ));
}
