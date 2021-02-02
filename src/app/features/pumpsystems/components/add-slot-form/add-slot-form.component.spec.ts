import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotFormComponent } from './add-slot-form.component';

describe('AddSlotFormComponent', () => {
  let component: AddSlotFormComponent;
  let fixture: ComponentFixture<AddSlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSlotFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
