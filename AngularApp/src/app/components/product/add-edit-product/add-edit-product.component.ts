import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { generateNewGuid } from '../../../shared/services/util';
import { Product } from '../../../models/product';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})

export class AddEditProductComponent implements OnInit {
  isEdit = false;
  addEditForm!: FormGroup;
  currentUser: any;

  constructor(private fb: FormBuilder,
              private productAPIService: ProductService,
              private userService: UserService,
              public dialogRef: MatDialogRef<AddEditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userService.userInfo.subscribe((res) => {
      if (res) {
        this.currentUser = res;
      } else {
        this.currentUser = (JSON.parse(localStorage.getItem('currentUser')));
      }
    });
    this.isEdit = data.formType === 'Edit';
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.addEditForm = this.fb.group({
      name: [(this.isEdit ? this.data.product.name : ''), Validators.required],
      manufacturer: [(this.isEdit ? this.data.product.manufacturer : ''), Validators.required],
      description: [(this.isEdit ? this.data.product.description : '')],
      price: [(this.isEdit ? this.data.product.price : ''), Validators.required],
    });
  }

  submit(): void {
    const data: Product = {
      name: this.addEditForm.value.name,
      manufacturer: this.addEditForm.value.manufacturer,
      description: this.addEditForm.value.description,
      price: this.addEditForm.value.price,
      userEmail: this.currentUser.email,
      userId: this.currentUser._id
    };
    if (this.isEdit) {
      this.productAPIService.updateProduct(this.data.product.productId, data).subscribe((res) => {
        this.dialogRef.close(true);
      });
    } else {
      data.productId = generateNewGuid();
      this.productAPIService.addProduct(data).subscribe((res) => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  isDisabled() {
    return this.data.product.name === this.addEditForm.value.name &&
      this.data.product.manufacturer === this.addEditForm.value.manufacturer &&
      this.data.product.description === this.addEditForm.value.description &&
      this.data.product.price === this.addEditForm.value.price;
  }
}
