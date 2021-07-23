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

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  constructor(public http: HttpClient) {}

  /**
   * Making handleError available to all classes in this module
   *
   * @param error Error from Http Response
   * @returns throwError function
   */
  public handleError = (error: HttpErrorResponse): any => {
    if (error.error.message) {
      if (error.error.info) {
        console.error('Some error occured: ', error.error.info.message);
        return throwError(error.error.info.message);
      }
      console.error('Some error occured:', error.error.message);
      return throwError(error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${JSON.stringify(error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  };

  // Using "any" instead of Response type to avoid error message for first parameter in map function
  /**
   * Callback function to extract response body from Http Response
   *
   * @param res Response from HttpRequest
   * @returns Reponse body or nothing if response body is empty
   */
  public extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Create authentication header for Http requests
   *
   * @returns HttpHeaders to use in Http Requests
   */
  public getAuthHeader = (): HttpHeaders => {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
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
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserLoginService extends BasicService {
  public userLogin(loginDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService extends BasicService {
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetMovieService extends BasicService {
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetDirectorService extends BasicService {
  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + name, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetGenreService extends BasicService {
  public getGenre(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + title, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService extends BasicService {
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .patch(
        apiUrl + 'users/' + username + 'movies/' + movieId,
        {},
        { headers: this.getAuthHeader() }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
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
      .delete(apiUrl + 'users/' + username + 'movies/' + movieId, {
        headers: this.getAuthHeader(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService extends BasicService {
  public updateUser(userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + userDetails.username, userDetails, {
        headers: this.getAuthHeader(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService extends BasicService {
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetUserService extends BasicService {
  public getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetUserFavoriteMoviesService extends BasicService {
  public getUserFavoriteMovies(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username + '/favoritemovies', {
        headers: this.getAuthHeader(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
