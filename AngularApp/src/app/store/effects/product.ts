import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes, GetAllProducts, GetMyProducts } from '../actions/product';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private productAPIService: ProductService) {
    }

    getAllProducts$: Observable<any> = createEffect(() => this.actions$.pipe(
      ofType(ActionTypes.GET_ALL_PRODUCTS),
      switchMap((a: GetAllProducts) => {
        return this.productAPIService.getProductList()
          .pipe(
            map((response: HttpResponse<Product[]>) => {
              return { data: response.body, status: response.status };
            }),
            catchError((error) => {
              return of({ data: undefined, status: error.status });
            })
          );
      }),
      map((allProducts: { data: Product, status: number }) => ({ type: ActionTypes.SET_ALL_PRODUCTS, payload: allProducts }))
    ));

  getMyProducts$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.GET_MY_PRODUCTS),
    switchMap((a: GetMyProducts) => {
      return this.productAPIService.getMyProductList(a.payload)
        .pipe(
          map((response: HttpResponse<Product[]>) => {
            return { data: response.body, status: response.status };
          }),
          catchError((error) => {
            return of({ data: undefined, status: error.status });
          })
        );
    }),
    map((myProducts: { data: Product, status: number }) => ({ type: ActionTypes.SET_MY_PRODUCTS, payload: myProducts }))
  ));
}
