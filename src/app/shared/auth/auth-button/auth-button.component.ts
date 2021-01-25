import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthTask, CanAuthenticate } from '@model/auth';
import { AuthDialogComponent, AUTHENTICATOR } from '../auth-dialog';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent {
  private static readonly AUTH_TASKS: Map<
    AuthTask,
    (dialog: MatDialog, auth: CanAuthenticate) => Promise<void>
  > = new Map<
    AuthTask,
    (dialog: MatDialog, auth: CanAuthenticate) => Promise<void>
  >([
    [
      AuthTask.SIGN_IN,
      (dialog, _) =>
        dialog
          .open(AuthDialogComponent, { data: AuthTask.SIGN_IN })
          .afterClosed()
          .pipe(mapTo(null))
          .toPromise(),
    ],
    [
      AuthTask.SIGN_UP,
      (dialog, _) =>
        dialog
          .open(AuthDialogComponent, { data: AuthTask.SIGN_UP })
          .afterClosed()
          .pipe(mapTo(null))
          .toPromise(),
    ],
    [AuthTask.SIGN_OUT, (_, auth) => auth.signOut()],
  ]);

  @Input()
  public color: string = 'accent';

  @Input()
  public task: AuthTask;

  constructor(
    private readonly dialog: MatDialog,
    @Inject(AUTHENTICATOR)
    private readonly auth: CanAuthenticate
  ) {}

  /** Executes an auth task
   *
   * @param task
   */
  public async execute(task: AuthTask): Promise<void> {
    return AuthButtonComponent.AUTH_TASKS.get(task)(this.dialog, this.auth);
  }
}
