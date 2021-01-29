import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectPermissionsComponent } from './user-select-permissions.component';

describe('UserSelectPermissionsComponent', () => {
  let component: UserSelectPermissionsComponent;
  let fixture: ComponentFixture<UserSelectPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
