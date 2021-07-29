import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  _loginSubscription: any;
  userLoggedIn: boolean;

  constructor(public mainService: MainService) {
    this.userLoggedIn = this.mainService.isLoggedin();
    this._loginSubscription = this.mainService.loginStateOnChange.subscribe(
      (value) => {
        this.onChangeLogin(value);
      }
    );
  }

  onChangeLogin(value: boolean): void {
    this.userLoggedIn = value;
  }
}
