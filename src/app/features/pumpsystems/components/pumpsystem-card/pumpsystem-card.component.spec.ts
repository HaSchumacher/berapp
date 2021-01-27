import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpsystemCardComponent } from './pumpsystem-card.component';

describe('PumpsystemCardComponent', () => {
  let component: PumpsystemCardComponent;
  let fixture: ComponentFixture<PumpsystemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumpsystemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpsystemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
