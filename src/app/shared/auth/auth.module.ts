import { NgModule } from '@angular/core';
import { CredentialsFormComponent } from './credentials-form';
import { AuthDialogComponent } from './auth-dialog';
import { AuthButtonComponent } from './auth-button';
import { CoreModule } from '@shared/core';

@NgModule({
  declarations: [
    CredentialsFormComponent,
    AuthDialogComponent,
    AuthButtonComponent,
  ],
  imports: [CoreModule],
  exports: [AuthButtonComponent],
})
export class AuthModule {}
