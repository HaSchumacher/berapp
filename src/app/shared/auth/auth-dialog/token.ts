import { InjectionToken } from '@angular/core';
import { CanAuthenticate } from '@model/auth';

export const AUTHENTICATOR: InjectionToken<CanAuthenticate> = new InjectionToken<CanAuthenticate>(
  ''
);
