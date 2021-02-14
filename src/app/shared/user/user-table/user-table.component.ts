import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserData } from '@model/auth';

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
  @Input()
  public data: UserData[];
  public _expandedUser: UserData;

  @Input()
  public columns: string[] = ['name', 'email', 'id', 'verified', 'expand'];

  @Output()
  public readonly selectionChange: EventEmitter<
    Partial<UserData>
  > = new EventEmitter<Partial<UserData>>();
}
