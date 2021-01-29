import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { UserData } from '@model/auth';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private _userData$: Observable<UserData[]>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this._userData$ = this.userService.getUserData().pipe(shareReplay(1));
  }

  get userData$(): Observable<UserData[]> {
    return this._userData$;
  }

  public update(user: UserData): Observable<void> {
    return this.userService.updateUserData(user);
  }
}
