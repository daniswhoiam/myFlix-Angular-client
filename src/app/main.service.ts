import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public loginState: boolean = localStorage.getItem('token') ? true : false;
  public loginStateOnChange: Subject<boolean> = new Subject<boolean>(); // listen to the variable isLogin

  isLoggedin(): boolean {
    return this.loginState;
  }
  setLoggedIn(value: boolean): void {
    this.loginState = value;
  }
}
