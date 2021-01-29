import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpsystemComponent } from './pumpsystem.component';

describe('PumpsystemComponent', () => {
  let component: PumpsystemComponent;
  let fixture: ComponentFixture<PumpsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpsystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
