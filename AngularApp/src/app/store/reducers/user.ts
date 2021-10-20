import { ActionTypes } from '../actions/user';
import * as userActions from '../actions/user';
import { ServerLoadStatus } from '../../models/enums/server-call-status';
import { User } from '../../models/user';

export interface State {
  userProfile: any;
  userProfileLoadStatus: ServerLoadStatus;
  allUsers: User[] | [];
  allUsersLoadStatus: ServerLoadStatus;
}

export const initialState: State = {
  userProfile: {},
  userProfileLoadStatus: ServerLoadStatus.Fresh,
  allUsers: [],
  allUsersLoadStatus: ServerLoadStatus.Fresh,
};

export function reducer(state = initialState, action: userActions.Actions): State {
  switch (action.type) {
    /** Reducer for Get User Profile */
    case ActionTypes.GET_USER_PROFILE: {
      return Object.assign({}, state, { userProfileLoadStatus: ServerLoadStatus.Loading });
    }

    /** Reducer for Set User Profile */
    case ActionTypes.SET_USER_PROFILE: {
      const payload: { data: any, status: number } = action.payload;
      return Object.assign({}, state, {
        userProfile: payload.data,
        userProfileLoadStatus: payload.status !== 200 ? ServerLoadStatus.Failed : payload.data ? ServerLoadStatus.Loaded : ServerLoadStatus.LoadedEmpty
      });
    }

    /** Reducer for Get all users */
    case ActionTypes.GET_ALL_USERS: {
      return Object.assign({}, state, { allUsersLoadStatus: ServerLoadStatus.Loading });
    }

    /** Reducer for Set all users */
    case ActionTypes.SET_ALL_USERS: {
      const payload: { data: User[], status: number } = action.payload;
      return Object.assign({}, state, {
        allUsers: payload.data,
        allUsersLoadStatus: payload.status !== 200 ? ServerLoadStatus.Failed : payload.data ? ServerLoadStatus.Loaded : ServerLoadStatus.LoadedEmpty
      });
    }

    default:
      return state;
  }
}

export const getUserProfile = (userState: State) => userState.userProfile;
export const getUserProfileLoadStatus = (userState: State) => userState.userProfileLoadStatus;
export const getAllUsers = (userState: State) => userState.allUsers;
export const getAllUsersLoadStatus = (userState: State) => userState.allUsersLoadStatus;
