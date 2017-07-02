import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Router } from '@angular/router';

import { Auth } from '../interfaces/auth'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  auth: Auth = {};

  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'ZZ-AUTH-TOKEN': this.auth.authToken,
  });

  constructor(private http: Http, private router: Router) { }

  getAuth(): Auth {
    // auth為空的話表示尚未登入
    if (this.auth.email) {
      this.router.navigateByUrl('login');
    } else {
      return this.auth;
    }
  }

  removeAuth(): void {
    this.auth = {};
  }

  login(facebookId: String, accessToken: String): Promise<Auth> {
    this.removeAuth();

    const url = "http://localhost:9000/loginByFacebook";
    var body: string = `facebookId=${facebookId}&facebookToken=${accessToken}`;
    return this.http
      .post(url, body, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.auth = response.json();
        return this.auth;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    // 這裡可以處理401和訊息嗎?
    return Promise.reject(error.message || error);
  }
}
