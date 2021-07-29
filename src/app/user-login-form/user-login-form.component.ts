import { Component, OnInit, Input, Output } from '@angular/core';

// To close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// API call for login
import { UserLoginService } from '../fetch-api-data.service';

// For user notifications
import { MatSnackBar } from '@angular/material/snack-bar';

// For routing
import { Router } from '@angular/router';

import { MainService } from '../main.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
/**
 * Displays the login form on the welcome page
 */
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  /**
   * Constructor for the login modal class
   * @param apiCall Allows to log-in the user
   * @param dialogRef References the dialog (modal) component
   * @param snackBar Display system messages
   * @param router ALlow redirect
   * @param mainService For tracking the user's login-status
   */
  constructor(
    public apiCall: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    public mainService: MainService
  ) {}

  ngOnInit(): void {}

  /**
   * Function that logs in the user via the API and redirects the user to the movies page.
   */
  loginUser(): void {
    this.apiCall.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.mainService.setLoggedIn(true);
        this.mainService.loginStateOnChange.next(this.mainService.isLoggedin());
        this.dialogRef.close();
        this.snackBar.open('Your login was successful!', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    );
  }
}
