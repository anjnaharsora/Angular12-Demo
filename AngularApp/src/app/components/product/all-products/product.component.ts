import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { MatSort } from '@angular/material/sort';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { select, Store } from '@ngrx/store';
import { GetAllProducts } from '../../../store/actions/product';
import { getAllProducts, getAllProductsLoadStatus, State } from '../../../store/reducers';
import { CommonUtilService } from '../../../shared/services/common-util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ServerLoadStatus } from '../../../models/enums/server-call-status';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'manufacturer', 'description', 'added_by', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  pageSize = 5;
  loadStatus: ServerLoadStatus;
  loadStatusEnum = ServerLoadStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private readonly destroyed = new Subject<void>();

  constructor(private productAPIService: ProductService,
              private commonUtilService: CommonUtilService,
              private authService: AuthService,
              private cdRef: ChangeDetectorRef,
              private store: Store<State>,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>([]);
    this.commonUtilService.pageTitle.next('All Products');
  }

  ngOnInit(): void {
    this.getAllProductsFromAPI();
  }

  getAllProductsFromAPI() {
    this.store.dispatch(new GetAllProducts());
    this.store.pipe(select(getAllProductsLoadStatus),
      takeUntil(this.destroyed)).subscribe((res) => {
      this.loadStatus = res;
    });
    this.store.pipe(select(getAllProducts),
      takeUntil(this.destroyed)).subscribe((res: Product[] | []) => {
        this.products = [];
        if (res?.length) {
          this.products = res;
          this.getTable();
        }
    });
  }

  getTable() {
    if (this.products.length) {
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  addEditProduct(type: string, product?: Product) {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      data: {
        formType: type,
        product
      },
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(new GetAllProducts());
        this.commonUtilService.openSnackBar(`Product ${type === 'Add' ? 'Added' : 'Edited'} successfully`);
      }
    });
  }

  deleteProduct(product: Product) {
    const dialogData = new ConfirmDialogModel('Confirm', `Are you sure you want to delete a product ${product.name}`, 'delete');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.productAPIService.deleteProduct(product.productId).subscribe((res) => {
          this.commonUtilService.openSnackBar(`${product.name} is deleted successfully`);
          this.store.dispatch(new GetAllProducts());
        });
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      filterValue = '';
    }
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    /** cleanup all opened observable streams */
    this.destroyed.next();
    this.destroyed.complete();
  }
}
