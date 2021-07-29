import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Generalistic service class
 */
export class MainService {
  public loginState: boolean = localStorage.getItem('token') ? true : false;
  public loginStateOnChange: Subject<boolean> = new Subject<boolean>(); // listen to the variable isLogin

  /**
   * Checks if user is logged in or not.
   * @returns The log-in status of the user (boolean)
   */
  isLoggedin(): boolean {
    return this.loginState;
  }

  /**
   * Sets the user's log-in status.
   * @param value New log-in status (boolean)
   */
  setLoggedIn(value: boolean): void {
    this.loginState = value;
  }
}
