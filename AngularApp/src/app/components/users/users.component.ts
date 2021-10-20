import { User } from '../../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { getAllUsers, getAllUsersLoadStatus, State } from '../../store/reducers';
import { select, Store } from '@ngrx/store';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerLoadStatus } from '../../models/enums/server-call-status';
import { GetAllUsers } from '../../store/actions/user';
import { takeUntil } from 'rxjs/operators';
import { EditUserComponent } from './edit-user/edit-user.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-component.html',
  styleUrls: ['./users-component.css']
})

export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'view_posts', 'actions'];
  dataSource = new MatTableDataSource<User>();
  pageSize = 5;
  loadStatus: ServerLoadStatus;
  loadStatusEnum = ServerLoadStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private readonly destroyed = new Subject<void>();

  constructor(private commonUtilService: CommonUtilService,
              private authService: AuthService,
              private userService: UserService,
              private cdRef: ChangeDetectorRef,
              private store: Store<State>,
              public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>([]);
    this.commonUtilService.pageTitle.next('Users');
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.store.dispatch(new GetAllUsers());
    this.store.pipe(select(getAllUsersLoadStatus),
      takeUntil(this.destroyed)).subscribe((res) => {
      this.loadStatus = res;
    });
    this.store.pipe(select(getAllUsers),
      takeUntil(this.destroyed)).subscribe((res: User[] | []) => {
        this.users = [];
        if (res?.length) {
          this.users = res;
          this.getTable();
        }
    });
  }

  getTable() {
    if (this.users.length) {
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        user
      },
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.commonUtilService.openSnackBar(`User edited successfully`);
        this.store.dispatch(new GetAllUsers());
      }
    });
  }

  deleteUser(user: User) {
    const dialogData = new ConfirmDialogModel('Confirm', `Are you sure you want to delete a user ${user.name}`, 'delete');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.userService.deleteUser(user._id).subscribe((res) => {
          this.commonUtilService.openSnackBar(`${user.name} is deleted successfully`);
          this.store.dispatch(new GetAllUsers());
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
