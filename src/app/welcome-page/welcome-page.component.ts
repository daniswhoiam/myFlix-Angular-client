import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
/**
 * First page that the user sees. Displays login and registration forms.
 */
export class WelcomePageComponent implements OnInit {
  /**
   * Constructor for the welcome page
   * @param dialog Allows to show dialogs
   */
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Opens registration modal upon click on button
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  /**
   * Opens login modal upon click on button
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
