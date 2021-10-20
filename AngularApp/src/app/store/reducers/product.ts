import { ActionTypes } from '../actions/product';
import * as ProductsActions from '../actions/product';
import { Product } from '../../models/product';
import { ServerLoadStatus } from '../../models/enums/server-call-status';

export interface State {
  allProducts: Product[] | [];
  allProductsLoadStatus: ServerLoadStatus;
  myProducts: Product[] | [];
  myProductsLoadStatus: ServerLoadStatus;
}

export const initialState: State = {
  allProducts: [],
  allProductsLoadStatus: ServerLoadStatus.Fresh,
  myProducts: [],
  myProductsLoadStatus: ServerLoadStatus.Fresh,
};

export function reducer(state = initialState, action: ProductsActions.Actions): State {
  switch (action.type) {
    /** Reducer for Get all products */
    case ActionTypes.GET_ALL_PRODUCTS: {
      return Object.assign({}, state, { allProductsLoadStatus: ServerLoadStatus.Loading });
    }

    /** Reducer for Set all products */
    case ActionTypes.SET_ALL_PRODUCTS: {
      const payload: { data: Product[], status: number } = action.payload;
      return Object.assign({}, state, {
        allProducts: payload.data,
        allProductsLoadStatus: payload.status !== 200 ? ServerLoadStatus.Failed : payload.data ? ServerLoadStatus.Loaded : ServerLoadStatus.LoadedEmpty
      });
    }

    /** Reducer for Get my products */
    case ActionTypes.GET_MY_PRODUCTS: {
      return Object.assign({}, state, { myProductsLoadStatus: ServerLoadStatus.Loading });
    }

    /** Reducer for Set my products */
    case ActionTypes.SET_MY_PRODUCTS: {
      const payload: { data: any, status: number } = action.payload;
      return Object.assign({}, state, {
        myProducts: payload.data,
        myProductsLoadStatus: payload.status !== 200 ? ServerLoadStatus.Failed : payload.data ? ServerLoadStatus.Loaded : ServerLoadStatus.LoadedEmpty
      });
    }

    default:
      return state;
  }
}

export const getAllProducts = (productState: State) => productState.allProducts;
export const getAllProductsLoadStatus = (productState: State) => productState.allProductsLoadStatus;
export const getMyProducts = (productState: State) => productState.myProducts;
export const getMyProductsLoadStatus = (productState: State) => productState.myProductsLoadStatus;
