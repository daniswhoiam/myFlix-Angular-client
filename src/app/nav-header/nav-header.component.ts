import { Component, OnInit } from '@angular/core';

// For routing
import { Router } from '@angular/router';

// For user notifications
import { MatSnackBar } from '@angular/material/snack-bar';

import { MainService } from '../main.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
/**
 * Static navigation header that is shown when the user is logged in
 */
export class NavHeaderComponent implements OnInit {
  /**
   * Constructor for the NavHeader class
   * @param router Allows routing for the links in the navigation
   * @param snackBar Display system messages
   * @param mainService Allows to track the log-in status of the user
   */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public mainService: MainService
  ) {}

  ngOnInit(): void {}

  /**
   * Logs out user upon button click and redirects to the welcome page.
   */
  logOutUser(): void {
    localStorage.clear();
    this.mainService.setLoggedIn(false);
    this.mainService.loginStateOnChange.next(this.mainService.isLoggedin());
    this.router.navigate(['welcome']);
    this.snackBar.open('Your logout was successful!', 'OK', {
      duration: 2000
    });
  }
}
