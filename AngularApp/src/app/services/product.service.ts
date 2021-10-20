import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  endpoint = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) { }

  /** @description getProductList() is used to get all products */
  getProductList(): Observable<HttpResponse<Product[]>> {
    const api = `${this.endpoint}/products`;
    return this.http.get<Product[]>(api, { headers: this.headers, observe: 'response' });
  }

  /** @description getMyProductList() is used to get all my products */
  getMyProductList(payload): Observable<HttpResponse<Product[]>> {
    const api = `${this.endpoint}/products/${payload}`;
    return this.http.get<Product[]>(api, { headers: this.headers, observe: 'response' });
  }

  /** @description addProduct() is used to add a new product */
  addProduct(payload): Observable<HttpResponse<any>> {
    const api = `${this.endpoint}/products/add`;
    return this.http.post<any>(api, payload, {headers: this.headers, observe: 'response'});
  }

  updateProduct(productId, payload): Observable<HttpResponse<any>> {
    const api = `${this.endpoint}/update-product/${productId}`;
    return this.http.put<any>(api, payload, {headers: this.headers, observe: 'response'});
  }

  deleteProduct(productId): Observable<HttpResponse<any>> {
    const api = `${this.endpoint}/delete-product/${productId}`;
    return this.http.delete<any>(api, {headers: this.headers, observe: 'response'});
  }
}
