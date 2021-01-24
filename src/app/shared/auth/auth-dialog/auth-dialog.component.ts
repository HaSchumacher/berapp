import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanAuthenticate, Credentials, AuthTask } from '@model/auth';
import { AUTHENTICATOR } from './token';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent {
  private static readonly AUTH_TASKS: Map<
    AuthTask,
    ({ email, password }: Credentials, auth: CanAuthenticate) => Promise<any>
  > = new Map<
    AuthTask,
    ({ email, password }: Credentials, auth: CanAuthenticate) => Promise<any>
  >([
    [
      AuthTask.SIGN_IN,
      ({ email, password }: Credentials, auth) => auth.signIn(email, password),
    ],
    [
      AuthTask.SIGN_UP,
      ({ email, password }: Credentials, auth) => auth.signup(email, password),
    ],
  ]);

  constructor(
    private readonly dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(AUTHENTICATOR)
    private readonly auth: CanAuthenticate,
    @Inject(MAT_DIALOG_DATA) public task: AuthTask
  ) {}

  /**
   * Closes the dialog
   */
  public cancel(): void {
    this.dialogRef.close();
  }

  /** Executes an authtask with the provided credentials.
   *
   * @param credentials
   * @param task
   */
  public async submit(credentials: Credentials, task: AuthTask): Promise<void> {
    return AuthDialogComponent.AUTH_TASKS.get(task)(
      credentials,
      this.auth
    ).then(() => this.dialogRef.close());
  }
}
