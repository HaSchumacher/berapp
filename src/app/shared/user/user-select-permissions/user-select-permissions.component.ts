import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { UserData } from '@model/auth';
import { Observable } from 'rxjs';
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
  public readonly selectedRole: EventEmitter<
    Partial<UserData>
  > = new EventEmitter<Partial<UserData>>();

  constructor(
    @Inject(USER_SELECT_ROLES_DATA) public readonly roles: Observable<any[]>
  ) {}

  public onSelectionChange(pumpsystem: string, role: any) {
    const update: Partial<UserData> = {
      id: this.user.id,
      permissions: { [pumpsystem]: role },
    };
    this.selectedRole.emit(update);
  }
}
