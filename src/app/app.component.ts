import { AuthResponse, FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = '使用臉書帳號登入測試...';

  login = {
    id: "",
    name: "",
    email: "",
  }
  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '453702171654607',
      version: 'v2.9'
    };

    console.log('Initializing Facebook');
    fb.init(initParams);
  }

  loginWithFacebook(): void {

    console.log("loginWithFacebook");


    this.fb.login()
      .then((response: LoginResponse) => {
        //console.log("authResponse...");
        //console.log(authResponse);

        this.fb.api('/me?fields=id,name,email')
          .then(res => {
            console.log(res);
            this.login.id = res.id;
            this.login.name = res.name;
            this.login.email = res.email;

            // TODO: 這裡再和後端建立SESSION記錄後端目前登入的使用者
          })
          .catch(e => console.log(e));
      })
      .catch((error: any) => console.error(error));
  }

  logoutWithFacebook(): void {
    this.fb.logout().then(() => {
      this.login = {
        id: "",
        name: "",
        email: "",
      }
    });
  }

}
