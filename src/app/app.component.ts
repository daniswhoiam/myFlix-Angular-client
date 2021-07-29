import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/**
 * Root / App class
 */
export class AppComponent {
  title = 'myFlix-Angular-client';
  _loginSubscription: any;
  userLoggedIn: boolean;

  /**
   * Constructor for root / app class
   * @param mainService Allows to track user log-in status
   */
  constructor(public mainService: MainService) {
    // Initiate everything necessary to track user log-in status
    this.userLoggedIn = this.mainService.isLoggedin();
    this._loginSubscription = this.mainService.loginStateOnChange.subscribe(
      (value) => {
        this.onChangeLogin(value);
      }
    );
  }

  /**
   * Changes user log-in statuss
   * @param value New user log-in status
   */
  onChangeLogin(value: boolean): void {
    this.userLoggedIn = value;
  }
}
