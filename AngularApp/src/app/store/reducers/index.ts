import { ActionReducerMap } from '@ngrx/store';
import * as fromProductData from './product';
import * as fromUserData from './user';
import { createSelector } from 'reselect';

export interface State {
  productData: fromProductData.State;
  userProfileData: fromUserData.State;
}

export const reducers: ActionReducerMap<State, any> = {
  productData: fromProductData.reducer,
  userProfileData: fromUserData.reducer
};

export const getProductState = (state: State) => state.productData;
export const getAllProducts = createSelector(getProductState, fromProductData.getAllProducts);
export const getAllProductsLoadStatus = createSelector(getProductState, fromProductData.getAllProductsLoadStatus);
export const getMyProducts = createSelector(getProductState, fromProductData.getMyProducts);
export const getMyProductsLoadStatus = createSelector(getProductState, fromProductData.getMyProductsLoadStatus);

export const getUserState = (state: State) => state.userProfileData;
export const getUserProfile = createSelector(getUserState, fromUserData.getUserProfile);
export const getUserProfileLoadStatus = createSelector(getUserState, fromUserData.getUserProfileLoadStatus);
export const getAllUsers = createSelector(getUserState, fromUserData.getAllUsers);
export const getAllUsersLoadStatus = createSelector(getUserState, fromUserData.getAllUsersLoadStatus);
