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
  styleUrls: ['./user-registration-form.component.scss']
})
/**
 * Displays the registration form on the welcome page
 */
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' };

  /**
   * Constructor for the registration modal
   * @param registerAPI Allows to register the user via API
   * @param dialogRef Reference to the dialog (modal)
   * @param snackBar Display system messages
   */
  constructor(
    public registerAPI: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Registers the user via the API
   */
  registerUser(): void {
    console.log(this.userData);
    this.registerAPI.userRegistration(this.userData).subscribe(
      (result) => {
        // TODO Logic for successful user registration
        this.dialogRef.close();
        this.snackBar.open('Your registration was successful!', 'OK', {
          duration: 2000
        });
      },
      (result) => {
        this.snackBar.open(result.data.error, 'OK', {
          duration: 2000
        });
      }
    );
  }
}
