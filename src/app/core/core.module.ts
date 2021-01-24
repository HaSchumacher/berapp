import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AUTHENTICATOR } from '@shared/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: AUTHENTICATOR,
      useExisting: AuthService,
    },
  ],
})
export class CoreModule {}
