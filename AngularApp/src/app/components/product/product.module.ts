import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './all-products/product.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { MyProductComponent } from './my-products/my-product.component';

@NgModule({
  declarations: [
    ProductComponent,
    MyProductComponent,
    AddEditProductComponent
  ],
  imports: [
      ProductRoutingModule,
      SharedModule,
      ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: []
})

export class ProductModule {}
