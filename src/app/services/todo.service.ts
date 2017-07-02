import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Auth } from '../interfaces/auth'
import { Todo } from '../interfaces/todo'
import { LoginService} from './login.service';

@Injectable()
export class TodoService {


  url: string = "http://localhost:9000/api/todos";

  constructor(private http: Http
    , private router: Router
    , private loginService: LoginService) { }


  getTodos(): Promise<Todo[]> {
    console.log("getTodos");
    var auth: Auth = this.loginService.getAuth();
    console.log(auth);
    var headers = new Headers({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': auth.authToken,
    });

    return this.http
      .get(this.url, { headers: headers })
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json().items;
      })
      .catch(this.handleError);
  }

  createTodo(todo: Todo): Promise<Todo> {
    var auth: Auth = this.loginService.getAuth();
    var headers = new Headers({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': auth.authToken,
    });

    return this.http
      .post(this.url, todo, { headers: headers })
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as Todo;
      })
      .catch(this.handleError);

  }

  deleteTodo(todo: Todo): Promise<void> {
    var auth: Auth = this.loginService.getAuth();
    var headers = new Headers({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': auth.authToken,
    });

    return this.http
      .delete(this.url + "/" + todo.id, { headers: headers })
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    // 這裡可以處理401和訊息嗎?
    return Promise.reject(error.message || error);
  }
}
