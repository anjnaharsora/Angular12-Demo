import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { select, Store } from '@ngrx/store';
import {
  getUserProfile,
  getUserProfileLoadStatus,
  State
} from '../../store/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ServerLoadStatus } from '../../models/enums/server-call-status';
import { GetUserProfile } from '../../store/actions/user';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { EditUserComponent } from '../users/edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser;
  userId: string;
  loadStatus: ServerLoadStatus;
  loadStatusEnum = ServerLoadStatus;

  private readonly destroyed = new Subject<void>();

  constructor(
    public authService: AuthService,
    private commonUtilService: CommonUtilService,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<State>,
  ) {
    this.userService.userInfo.subscribe((res) => {
      this.currentUser = res;
    });
    this.commonUtilService.pageTitle.next('Profile');
  }

  ngOnInit() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.store.dispatch(new GetUserProfile(this.currentUser._id));
      this.store.pipe(select(getUserProfileLoadStatus),
        takeUntil(this.destroyed)).subscribe((res) => {
        this.loadStatus = res;
      });
      this.store.pipe(select(getUserProfile),
        takeUntil(this.destroyed)).subscribe((res: any) => {
        if (res) {
          this.currentUser = res.msg;
        }
      });
    } else {
      this.loadStatus = 2;
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
        this.store.dispatch(new GetUserProfile(this.currentUser._id));
        this.commonUtilService.openSnackBar(`Profile updated successfully`);
      }
    });
  }

  ngOnDestroy() {
    /** cleanup all opened observable streams */
    this.destroyed.next();
    this.destroyed.complete();
  }
}
