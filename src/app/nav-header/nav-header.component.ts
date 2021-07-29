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
export class NavHeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public mainService: MainService
  ) { }

  ngOnInit(): void {
  }

  logOutUser(): void {
    localStorage.clear();
    this.mainService.setLoggedIn(false);
    this.mainService.loginStateOnChange.next(this.mainService.isLoggedin());
    this.router.navigate(['welcome']);
    this.snackBar.open('Your logout was successful!', 'OK', {
      duration: 2000,
    });
  }
}
