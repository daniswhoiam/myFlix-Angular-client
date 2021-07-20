import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app

const apiUrl = 'https://daniswhoiam-myflix.herokuapp.com/';

/**
 * Making handleError available to all classes in this module
 *
 * @param error Error from Http Response
 * @returns throwError function
 */
const handleError = (error: HttpErrorResponse): any => {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occured:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
    );
  }
  return throwError('Something bad happened; please try again later.');
};

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}

  public UserLogin(loginDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetMovieService {
  constructor(private http: HttpClient) {}

  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title)
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  constructor(private http: HttpClient) {}

  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + name)
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  constructor(private http: HttpClient) {}

  public getGenre(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + title)
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) {}

  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .patch(apiUrl + 'users/' + username + 'movies/' + movieId, {})
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteFavoriteMovieService {
  constructor(private http: HttpClient) {}

  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + 'movies/' + movieId)
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  constructor(private http: HttpClient) {}

  public updateUser(userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userDetails.username, userDetails)
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username)
      .pipe(catchError(handleError));
  }
}
