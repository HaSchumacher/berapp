import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CredentialsFormComponent } from './credentials-form/credentials-form.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';

@NgModule({
  declarations: [
    CredentialsFormComponent,
    AuthDialogComponent,
    AuthButtonComponent,
  ],
  imports: [SharedModule],
  exports: [AuthButtonComponent],
})
export class AuthModule {}
