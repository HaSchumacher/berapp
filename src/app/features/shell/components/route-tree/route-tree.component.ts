import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Route } from '@model/routing';

@Component({
  selector: 'app-route-tree',
  templateUrl: './route-tree.component.html',
  styleUrls: ['./route-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RouteTreeComponent {
  @Input()
  public routes: Route[];
  @Input()
  public _level: number = 0;
}
