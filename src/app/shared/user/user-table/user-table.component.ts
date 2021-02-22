import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserData } from '@model/auth';
import { isNonNull } from '@utilities';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserTableComponent {
  private _data: UserData[];

  @Input()
  public set data(value: UserData[]) {
    this._data = value;
    if (isNonNull(value) && isNonNull(this._expandedUser)) {
      this._expandedUser = value.find(
        (user) => user.id === this._expandedUser.id
      );
    }
  }
  public _expandedUser: UserData;

  @Input()
  public columns: string[] = [
    'name',
    'email',
    'id',
    'superadmin',
    'verified',
    'expand',
  ];

  @Output()
  public readonly selectionChange: EventEmitter<
    Partial<UserData>
  > = new EventEmitter<Partial<UserData>>();

  public get data(): UserData[] {
    return this._data;
  }
}
