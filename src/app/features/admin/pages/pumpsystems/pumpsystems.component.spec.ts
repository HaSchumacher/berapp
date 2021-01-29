import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpsystemsComponent } from './pumpsystems.component';

describe('PumpsystemsComponent', () => {
  let component: PumpsystemsComponent;
  let fixture: ComponentFixture<PumpsystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpsystemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpsystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
