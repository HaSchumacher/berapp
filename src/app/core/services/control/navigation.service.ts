import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTask } from '@model';
import { ROOT } from '@routes';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    this.handleSignOut();
  }

  private handleSignOut(): void {
    this.auth.task$
      .pipe(
        filter((info) => info.task === AuthTask.SIGN_OUT && info.success),
        switchMap((_) => this.router.navigateByUrl(ROOT))
      )
      .subscribe();
  }
}
