import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthTask } from '@model/auth';
import { Observable } from 'rxjs';
import { AuthDialogComponent } from '../auth-dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthDialog {
  constructor(private readonly dialog: MatDialog) {}

  public open(): Observable<any> {
    return this.dialog
      .open(AuthDialogComponent, { data: AuthTask.SIGN_IN })
      .afterClosed();
  }
}
