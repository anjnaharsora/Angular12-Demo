import { Action } from '@ngrx/store';
import { Product } from '../../models/product';
import { type } from '../../shared/services/util';

export const ActionTypes = {
    GET_ALL_PRODUCTS: type('GET ALL PRODUCTS'),
    SET_ALL_PRODUCTS: type('SET ALL PRODUCTS'),
    GET_MY_PRODUCTS: type('GET MY PRODUCTS'),
    SET_MY_PRODUCTS: type('SET MY PRODUCTS'),
};

/** Action for Get All Products */
export class GetAllProducts implements Action {
    type = ActionTypes.GET_ALL_PRODUCTS;
    constructor() {
        // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
    }
}

/** Action for Set All Products */
export class SetAllProducts implements Action {
    type = ActionTypes.SET_ALL_PRODUCTS;
    constructor(public payload: { data: Product[], status: number }) {
      // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
    }
}

/** Action for Get My Products */
export class GetMyProducts implements Action {
  type = ActionTypes.GET_MY_PRODUCTS;
  constructor(public payload) {
    // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
  }
}

/** Action for Set My Products */
export class SetMyProducts implements Action {
  type = ActionTypes.SET_MY_PRODUCTS;
  constructor(public payload: { data: Product[], status: number }) {
    // constructor(public payload: { dispatchedByInterval: boolean } = { dispatchedByInterval: false }) {
  }
}

export type Actions =
  GetAllProducts |
  SetAllProducts |
  GetMyProducts |
  SetMyProducts;
