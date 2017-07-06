import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacebookModule } from 'ngx-facebook';
import { LoginService } from './services/login.service';
import { TodoService } from './services/todo.service';
import { AlertService } from './services/alert.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }, {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'login',
        component: LoginComponent
      }
    ])
  ],
  providers: [LoginService, TodoService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
