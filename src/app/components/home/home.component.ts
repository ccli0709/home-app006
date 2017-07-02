import { Component, OnInit } from '@angular/core';

import { Auth } from '../../interfaces/auth'
import { LoginService} from '../../services/login.service';
import { Todo } from '../../interfaces/todo'
import { TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: Auth = {};
  todos: Todo[];

  constructor(private loginService: LoginService, private todoService: TodoService) {
    this.auth = loginService.getAuth();
    this.todoService.getTodos().then(data => {
      this.todos = data as Todo[];
    });
  }

  ngOnInit() {
  }

  createTodo(newTodoValue: string): void {
    var newTodo: Todo = { id: -1, value: newTodoValue };
    this.todoService.createTodo(newTodo).then(data => {
      this.todoService.getTodos().then(data => {
        this.todos = data as Todo[];
      });
    });
  }

  deleteTodo(todo: Todo): void {

    this.todoService.deleteTodo(todo).then(data => {
      this.todoService.getTodos().then(data => {
        this.todos = data as Todo[];
      });
    });
  }

}
