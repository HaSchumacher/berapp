import { Component, Input } from '@angular/core';
import { Pumpsystem } from '@model/pumpsystem';

@Component({
  selector: 'app-pumpsystem-card',
  templateUrl: './pumpsystem-card.component.html',
  styleUrls: ['./pumpsystem-card.component.scss'],
})
export class PumpsystemCardComponent {
  @Input()
  public pumpsystem: Pumpsystem;
}
