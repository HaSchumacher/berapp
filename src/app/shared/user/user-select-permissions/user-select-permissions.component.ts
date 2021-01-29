import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { UserData } from '@model/auth';
import { USER_SELECT_ROLES_DATA } from './token';

@Component({
  selector: 'app-user-select-permissions',
  templateUrl: './user-select-permissions.component.html',
  styleUrls: ['./user-select-permissions.component.scss'],
})
export class UserSelectPermissionsComponent {
  @Input()
  public user: UserData;

  @Output()
  public readonly selectedRole: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(USER_SELECT_ROLES_DATA) public readonly roles: any[]) {}

  public onSelectionChange(object: string, role: any) {
    this.user.permissions[object] = role;
    this.selectedRole.emit(this.user);
  }
}
