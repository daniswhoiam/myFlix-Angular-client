import { Component, OnInit } from '@angular/core';
import {
  GetAllMoviesService,
  AddFavoriteMovieService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // Why not in constructor?
  movies: any[] = [];
  constructor(
    public getMoviesApi: GetAllMoviesService,
    public addFavoriteMovieApi: AddFavoriteMovieService,
    public deleteFavoriteMovieApi: DeleteFavoriteMovieService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  user: any = this.getUser();
  userFavoriteMovies: Array<String> = this.getUser().FavoriteMovies || [''];

  getMovies(): void {
    this.getMoviesApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  toggleFavoriteMovie(movieId: string): void {
    if (!this.userFavoriteMovies.includes(movieId)) {
      this.addFavoriteMovieApi
        .addFavoriteMovie(this.user.Username, movieId)
        .subscribe(
          (result) => {
            this.setUserData(result);
          },
          (result) => {
            this.snackBar.open(result.data.error, 'OK', {
              duration: 2000,
            });
          }
        );
    } else {
      this.deleteFavoriteMovieApi
        .deleteFavoriteMovie(this.user.Username, movieId)
        .subscribe(
          (result) => {
            this.setUserData(result);
          },
          (result) => {
            this.snackBar.open(result.data.error, 'OK', {
              duration: 2000,
            });
          }
        );
    }
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '') || {};
  }

  setUserData(result: any): void {
    localStorage.setItem('user', JSON.stringify(result));
    this.user = this.getUser();
    this.userFavoriteMovies = this.getUser().FavoriteMovies || [''];
  }
}
