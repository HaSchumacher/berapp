import { Component } from '@angular/core';
import { StoreService } from '@core/services';

@Component({
  selector: 'app-pumpsystems-overview',
  templateUrl: './pumpsystems-overview.component.html',
  styleUrls: ['./pumpsystems-overview.component.scss'],
})
export class PumpsystemsOverviewComponent {
  constructor(public readonly store: StoreService) {}
}
