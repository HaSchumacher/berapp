import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from '@core';
import { FieldTemplatesService } from '@core/services/data/field-templates.service';
import { FieldTemplate } from '@model/fieldTemplate';
import { isNonNull } from '@utilities';
import { Observable } from 'rxjs';
import { delay, filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit{
  public fields: Observable<FieldTemplate[]>;
  public _currentTemplate: FieldTemplate;
  public readonly name:String;
  public readonly irrigationDuration:number;

  public displayedColumns: String[] = ['name','irrigationDuration'];
  dataSource: MatTableDataSource<FieldTemplate>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public readonly store:StoreService, public readonly fieldTemplateService: FieldTemplatesService) { 
    this.dataSource = new MatTableDataSource<FieldTemplate>();
  }
  
  ngOnInit(): void {
    this.store.user$.pipe(filter(user => isNonNull(user)),switchMap((user)=> this.fieldTemplateService.getFields(user)))
    .subscribe((fieldTemplates: FieldTemplate[])=> this.dataSource = new MatTableDataSource<FieldTemplate>(fieldTemplates))
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
