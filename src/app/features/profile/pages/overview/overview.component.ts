<<<<<<< HEAD
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
=======
import { Component, OnInit } from '@angular/core';
import { StoreService, UserService } from '@core/services';
import { FieldTemplatesService } from '@core/services/data/field-templates.service';

import { User, UserData } from '@model/auth';
import { FieldTemplate } from '@model/fieldTemplate';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';


>>>>>>> first profile overview

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
<<<<<<< HEAD
export class OverviewComponent implements OnInit, AfterViewInit{
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
  ngAfterViewInit(): void {
    delay(3000);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
   ngOnInit(): void {
    this.store.user$.pipe(filter(user => isNonNull(user)),switchMap((user)=> this.fieldTemplateService.getFields(user)))
    .subscribe((fieldTemplates: FieldTemplate[])=> this.dataSource = new MatTableDataSource<FieldTemplate>(fieldTemplates))
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
=======
export class OverviewComponent implements OnInit{
  public fields: Observable<FieldTemplate[]>
  constructor(public readonly store:StoreService, public readonly fieldTemplateService: FieldTemplatesService) { 
    
  }
  ngOnInit(): void {
    this.fields = this.store.user$.pipe(switchMap((user)=> 
      this.fieldTemplateService.getFields(user)))
>>>>>>> first profile overview
  }

}
