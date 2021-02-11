import { Component, OnInit } from '@angular/core';
import { StoreService, UserService } from '@core/services';
import { FieldTemplatesService } from '@core/services/data/field-templates.service';

import { User, UserData } from '@model/auth';
import { FieldTemplate } from '@model/fieldTemplate';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  public fields: Observable<FieldTemplate[]>
  constructor(public readonly store:StoreService, public readonly fieldTemplateService: FieldTemplatesService) { 
    
  }
  ngOnInit(): void {
    this.fields = this.store.user$.pipe(switchMap((user)=> 
      this.fieldTemplateService.getFields(user)))
  }

}
