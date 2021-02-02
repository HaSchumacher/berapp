import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsTimelineComponent } from './slots-timeline.component';

describe('SlotsTimelineComponent', () => {
  let component: SlotsTimelineComponent;
  let fixture: ComponentFixture<SlotsTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
