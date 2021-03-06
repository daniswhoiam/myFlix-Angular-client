import { Component, OnInit, Input } from '@angular/core';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' };

  constructor(
    public registerAPI: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This function is responsible for sending the form inputs to the backend
  registerUser(): void {
    console.log(this.userData);
    this.registerAPI.userRegistration(this.userData).subscribe(
      (result) => {
        // TODO Logic for successful user registration
        this.dialogRef.close();
        this.snackBar.open('Your registration was successful!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result.data.error, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
