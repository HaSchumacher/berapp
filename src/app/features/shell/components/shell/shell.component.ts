import { Component } from '@angular/core';
import { MediaService, StoreService } from '@core/services';
import { Route } from '@model/routing';
import { ADMIN_FEAUTURE, PUMPSYSTEMS_FEAUTURE, ROOT } from '@routes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  public readonly home: string = ROOT;
  public readonly routes$: Observable<Route[]>;

  constructor(
    public readonly media: MediaService,
    public readonly store: StoreService
  ) {
    this.routes$ = this.store.user$.pipe(
      map((user) =>
        user == null || !user.data.superadmin
          ? [PUMPSYSTEMS_FEAUTURE]
          : [PUMPSYSTEMS_FEAUTURE, ADMIN_FEAUTURE]
      ),
      map((routes) => this.createAbsolutePaths(routes))
    );
  }

  private createAbsolutePaths(routes: Route[], prefix: string = ''): Route[] {
    return routes?.map((route) => ({
      name: route.name,
      path: `${prefix}/${route.path}`,
      children: this.createAbsolutePaths(route.children, route.path),
    }));
  }
}
