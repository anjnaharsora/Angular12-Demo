import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './all-products/product.component';
import { MyProductComponent } from './my-products/my-product.component';

const routes: Routes = [
  {
    path: 'allProducts',
    component: ProductComponent
  },
  {
    path: 'products',
    component: MyProductComponent
  },
  {
    path: 'userProducts/:id',
    component: MyProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
