import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpsystemsOverviewComponent } from './pumpsystems-overview.component';

describe('PumpsystemsOverviewComponent', () => {
  let component: PumpsystemsOverviewComponent;
  let fixture: ComponentFixture<PumpsystemsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpsystemsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpsystemsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
