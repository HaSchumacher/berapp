import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
/**
 * https://material.io/design/layout/responsive-layout-grid.html#breakpoints
 */
@Injectable({
  providedIn: 'root',
})
export class MediaService {
  public readonly small$: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.small$ = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        shareReplay(1),
        map((state) => state.matches)
      );
  }
}
