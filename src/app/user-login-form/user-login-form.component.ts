import { Component, OnInit, Input } from '@angular/core';

// To close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// API call for login
import { UserLoginService } from '../fetch-api-data.service';

// For user notifications
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.apiCall.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Your login was successful!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

const response = {
  headers: { normalizedNames: {}, lazyUpdate: null, headers: {} },
  status: 0,
  statusText: 'Unknown Error',
  url: 'https://daniswhoiam-myflix.herokuapp.com/login',
  ok: false,
  name: 'HttpErrorResponse',
  message:
    'Http failure response for https://daniswhoiam-myflix.herokuapp.com/login: 0 Unknown Error',
  error: { isTrusted: true },
};