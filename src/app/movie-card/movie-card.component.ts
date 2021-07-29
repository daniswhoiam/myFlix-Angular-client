import { Component, OnInit } from '@angular/core';
import {
  GetAllMoviesService,
  AddFavoriteMovieService,
  DeleteFavoriteMovieService
} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * Displays movies that are fetched from the API and allows to display more details about the
 * movies as well as add movies to the user's favorite movies collection.
 */
export class MovieCardComponent implements OnInit {
  // Why not in constructor?
  movies: any[] = [];

  /**
   * Constructor of the MovieCard class
   * @param getMoviesApi Allows to get all movies from the API
   * @param addFavoriteMovieApi Allows to add a favorite movie via the API
   * @param deleteFavoriteMovieApi Allows to remove a favorite movie via the API
   * @param snackBar Display system messages
   * @param modal Modal to show movie details
   */
  constructor(
    public getMoviesApi: GetAllMoviesService,
    public addFavoriteMovieApi: AddFavoriteMovieService,
    public deleteFavoriteMovieApi: DeleteFavoriteMovieService,
    public snackBar: MatSnackBar,
    public modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  user: any = this.getUser();
  userFavoriteMovies: Array<String> = this.getUser().FavoriteMovies || [''];

  /**
   * Function to fetch movies from API
   * @returns movies Array
   */
  getMovies(): void {
    this.getMoviesApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Adds or deletes a movie to the user's favorite movies, depending on whether the movie
   * had been added as a favorite before
   * @param movieId Unique identifier for a movie
   */
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
              duration: 2000
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
              duration: 2000
            });
          }
        );
    }
  }

  /**
   * Retrieves user information from localStorage
   * @returns Object with user information
   */
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '') || {};
  }

  /**
   * Changes user data in localStorage after API call
   * @param result Result from API call (if successful)
   */
  setUserData(result: any): void {
    localStorage.setItem('user', JSON.stringify(result));
    this.user = this.getUser();
    this.userFavoriteMovies = this.getUser().FavoriteMovies || [''];
  }

  // Solution inspired by https://github.com/angular/components/issues/10459, comment by arlowhite
  /**
   * Displays modal with different movie detail information based on which button is clicked
   * @param templateRef Reference to the template in the component html file
   * @param selector String to identify which details to display
   * @param movie Object to retrieve movie specific information
   * @returns null
   */
  showDetailsModal(templateRef: any, selector: string, movie: any): void {
    switch (selector) {
      case 'Genre':
        this.modal.open(templateRef, {
          width: '300px',
          data: {
            heading: selector,
            name: movie.Genre.Name,
            text: movie.Genre.Description
          }
        });
        return;
      case 'Director':
        this.modal.open(templateRef, {
          width: '300px',
          data: {
            heading: selector,
            name: movie.Director.Name,
            text: movie.Director.Bio,
            birth: movie.Director.Birth,
            death: movie.Director.Death
          }
        });
        return;
      case 'Synopsis': {
        this.modal.open(templateRef, {
          width: '300px',
          data: {
            heading: selector,
            name: movie.Title,
            text: movie.Description,
            release: movie.ReleaseYear,
            rating: movie.Rating
          }
        });
        return;
      }
    }
  }
}
