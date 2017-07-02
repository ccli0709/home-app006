
import { Component, OnInit } from '@angular/core';
import { AuthResponse, FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

import { Auth } from '../../interfaces/auth'
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = '使用臉書帳號登入測試...';

  auth: Auth = {};

  constructor(private fb: FacebookService
    , private loginService: LoginService) {
    let initParams: InitParams = {
      appId: '453702171654607',
      version: 'v2.9'
    };

    console.log('Initializing Facebook');
    fb.init(initParams);

    //this.auth = loginService.getAuth();
  }

  ngOnInit() {
  }

  login(): void {

    console.log("loginWithFacebook");

    this.fb.login()
      .then((response: LoginResponse) => {
        this.loginService
          .login(response.authResponse.userID, response.authResponse.accessToken)
          .then((auth: Auth) => this.auth = auth)
          .catch((error: any) => console.error(error));
      })
      .catch((error: any) => console.error(error));
  }

  logout(): void {
    this.loginService.removeAuth();
    this.auth = this.loginService.getAuth();
  }

  getTodos(): void {

  }

}
