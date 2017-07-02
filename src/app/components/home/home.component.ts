import { Component, OnInit } from '@angular/core';

import { Auth } from '../../interfaces/auth'
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: Auth = {};

  constructor(private loginService: LoginService) {

    this.auth = loginService.getAuth();

  }

  ngOnInit() {
  }

}
