import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonUtilService {

  public pageTitle: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private snackBar: MatSnackBar
  ) { }

  /**
   * @description use to auto open popup
   */
  openSnackBar(message: string, action: string = 'OK', timeDuration = 4000): MatSnackBarRef<any> {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, action, {
      duration: timeDuration,
      panelClass: 'cvbe-snackbar'
    });
    return snackBarRef;
  }
}
