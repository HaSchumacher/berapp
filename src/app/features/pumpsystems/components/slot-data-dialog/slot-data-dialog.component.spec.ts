import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDataDialogComponent } from './slot-data-dialog.component';

describe('SlotDataDialogComponent', () => {
  let component: SlotDataDialogComponent;
  let fixture: ComponentFixture<SlotDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotDataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
