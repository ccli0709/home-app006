import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Auth } from '../interfaces/auth'


@Injectable()
export class LoginService {

  auth: Auth = {};

  // FOR TEST
  //auth: Auth = {
  //  email: 'ccli0709',
  //  name: '李政忠',
  //  authToken: "a2624cd0-484f-4706-8cba-a4e7d002aefa",
  //  facebookId: "10154731161166452",
  //};

  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'ZZ-AUTH-TOKEN': this.auth.authToken,
  });

  constructor(private http: Http, private router: Router) { }

  getAuth(): Auth {
    // auth為空的話表示尚未登入
    if (this.auth.facebookId) {
      return this.auth;
    } else {
      this.router.navigateByUrl('login');
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
