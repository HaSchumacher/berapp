import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _appName: string = 'berapp';

  constructor() {}

  public get appName(): string {
    return this._appName;
  }
}
