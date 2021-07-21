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

class BasicService {
  constructor(public http: HttpClient) {}
  
  /**
   * Making handleError available to all classes in this module
   *
   * @param error Error from Http Response
   * @returns throwError function
   */
  public handleError = (error: HttpErrorResponse): any => {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService extends BasicService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserLoginService extends BasicService {
  public UserLogin(loginDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService extends BasicService {
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetMovieService extends BasicService {
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetDirectorService extends BasicService {
  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + name)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetGenreService extends BasicService {
  public getGenre(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + title)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService extends BasicService {
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .patch(apiUrl + 'users/' + username + 'movies/' + movieId, {})
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteFavoriteMovieService extends BasicService {
  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + 'movies/' + movieId)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService extends BasicService {
  public updateUser(userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userDetails.username, userDetails)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService extends BasicService {
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError));
  }
}
