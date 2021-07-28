import { Component, OnInit, Input } from '@angular/core';

// For routing
import { Router } from '@angular/router';

// This import brings in the API calls
import {
  UpdateUserService,
  DeleteUserService,
} from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(
    public updateApi: UpdateUserService,
    public deleteApi: DeleteUserService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  localStorageUser: string = localStorage.getItem('user') || '';
  // Type should be JSON but then it says property not found
  user: any = JSON.parse(this.localStorageUser);

  changeUserData(): void {
    if (!this.userData.Username) this.userData.Username = this.user.Username;
    if (!this.userData.Email) this.userData.Email = this.user.Email;
    this.updateApi.updateUser(this.user, this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.user = result;
        this.userData = { Username: '', Password: '', Email: '' };
        this.snackBar.open('Your data has been successfully updated!', 'OK', {
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

  deleteUser(): void {
    this.deleteApi.deleteUser(this.user.Username).subscribe(
      (result) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Your account has been successfully deleted!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      (result) => {
        this.snackBar.open(result.data.error, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
