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
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public apiCall: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    public mainService: MainService
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.apiCall.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.mainService.setLoggedIn(true);
        this.mainService.loginStateOnChange.next(this.mainService.isLoggedin());
        this.dialogRef.close();
        this.snackBar.open('Your login was successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
