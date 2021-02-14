import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifiedCheckboxComponent } from './user-verified-checkbox.component';

describe('UserVerifiedCheckboxComponent', () => {
  let component: UserVerifiedCheckboxComponent;
  let fixture: ComponentFixture<UserVerifiedCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerifiedCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerifiedCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
