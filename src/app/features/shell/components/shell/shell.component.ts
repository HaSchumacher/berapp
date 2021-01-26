import { Component } from '@angular/core';
import { MediaService, StoreService } from '@core/services';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  constructor(
    public readonly media: MediaService,
    public readonly store: StoreService
  ) {}
}
