import { Injectable } from '@angular/core';
import { Alert } from '../interfaces/alert';

import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
  
  private alerts: Alert[] = [{ type: 'warnig', message: 'test' }];

  alerts$: Observable<Alert[]>;
  private _alertObserver: Observer<Alert[]>;

  constructor() {
    this.alerts$ = new Observable(observer => this._alertObserver = observer);
  }

  setAlerts(_alerts: Alert[]): void {
    this.alerts = _alerts;
    this._alertObserver.next(this.alerts);
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

}
