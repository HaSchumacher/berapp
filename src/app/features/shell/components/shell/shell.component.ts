import { Component } from '@angular/core';
import { MediaService, StoreService } from '@core/services';
import { FieldTemplatesService } from '@core/services/data/field-templates.service';
import { User } from '@model/auth/User';
import { debug } from 'console';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  constructor(
    public readonly media: MediaService,
    public readonly store: StoreService,
    public readonly fieldTemplate: FieldTemplatesService,
  ) {
    this.store.user$
      .pipe( filter(x=> x != null),
        switchMap((user) =>
        this.fieldTemplate.getFields(user)
      )
      )
      .subscribe({next: (response)=> console.log("field = "  + response)});
      
  }
}
