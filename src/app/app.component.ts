

import { Component } from '@angular/core';

import { Alert } from './interfaces/alert'
import { AlertService} from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  alerts: Alert[];
  constructor(private alertService: AlertService) {
    alertService.alerts$.subscribe((newAlerts) => {
      this.alerts = newAlerts;
    });
  }

  ngOnInit() {
    // 获得Obervable对象并进行订阅
    this.alerts = this.alertService.getAlerts();
  }

}
