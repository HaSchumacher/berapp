import { Inject, NgModule, Optional } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Logger, LOGGER } from '@model/logging';
import { AUTHENTICATOR } from '@shared/auth';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { AuthService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { USER_SELECT_ROLES_DATA } from '@shared/user';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({ level: environment.ngxLogLevel }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: AUTHENTICATOR,
      useExisting: AuthService,
    },
    {
      provide: USER_SELECT_ROLES_DATA,
      useValue: ['admin', 'writer', 'reader'], //TODO fetch from firestore
    },
    {
      provide: LOGGER,
      useExisting: NGXLogger,
    },
  ],
})
export class CoreModule {
  constructor(@Inject(LOGGER) @Optional() private readonly logger: Logger) {
    this.logger?.trace('Init Core Module');
  }
}
