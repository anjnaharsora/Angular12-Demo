import { Action } from '@ngrx/store';
import { type } from '../../shared/services/util';
import { User } from '../../models/user';

export const ActionTypes = {
  GET_USER_PROFILE: type('GET USER PROFILE'),
  SET_USER_PROFILE: type('SET USER PROFILE'),
  GET_ALL_USERS: type('GET ALL USERS'),
  SET_ALL_USERS: type('SET ALL USERS'),
};

/** Action for Get User Profile */
export class GetUserProfile implements Action {
  type = ActionTypes.GET_USER_PROFILE;
  constructor(public payload) {
    // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
  }
}

/** Action for Set User Profile */
export class SetUserProfile implements Action {
  type = ActionTypes.SET_USER_PROFILE;
  constructor(public payload: { data: any, status: number }) {
    // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
  }
}

/** Action for Get All Users */
export class GetAllUsers implements Action {
  type = ActionTypes.GET_ALL_USERS;
  constructor() {
    // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
  }
}

/** Action for Set All Users */
export class SetAllUsers implements Action {
  type = ActionTypes.SET_ALL_USERS;
  constructor(public payload: { data: User[], status: number }) {
    // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
  }
}

export type Actions =
  GetUserProfile |
  SetUserProfile |
  GetAllUsers |
  SetAllUsers;
