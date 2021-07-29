import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://daniswhoiam-myflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
/**
 * Template class for services in this document
 */
export class BasicService {
  /**
   * Constructor for tempate service class
   * @param http Allows to make http requests
   */
  constructor(public http: HttpClient) {}

  /**
   * Making handleError available to all classes in this module
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
   * @param res Response from HttpRequest
   * @returns Reponse body or nothing if response body is empty
   */
  public extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Create authentication header for Http requests
   * @returns HttpHeaders to use in Http Requests
   */
  public getAuthHeader = (): HttpHeaders => {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  };
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to handle user registration
 */
export class UserRegistrationService extends BasicService {
  /**
   * Performs POST request to registration endpoint
   * @param userDetails Object with user information from registration form
   * @returns Observable
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to handle user login
 */
export class UserLoginService extends BasicService {
  /**
   * Performs POST request to login endpoint
   * @param loginDetails Object with user information from login form
   * @returns Observable
   */
  public userLogin(loginDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to get all movie data
 */
export class GetAllMoviesService extends BasicService {
  /**
   * Performs GET request to movies endpoint (needs authorization)
   * @returns Observable
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to get specific movie data
 */
export class GetMovieService extends BasicService {
  /**
   * Performs GET request to movie endpoint with title as param (needs authorization)
   * @param title Title that identifies the movie
   * @returns Observable
   */
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to get information about a movie's director
 */
export class GetDirectorService extends BasicService {
  /**
   * Performs GET request to directors endpoint with name as param (needs authorization)
   * @param name The name of the director
   * @returns Observable
   */
  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + name, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to get information about a movie's genre
 */
export class GetGenreService extends BasicService {
  /**
   * Performs GET request to genres endpoint with title as param (needs authorization)
   * @param title The title/name of the genre
   * @returns Observable
   */
  public getGenre(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + title, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to add a movie to a user's favorite movies
 */
export class AddFavoriteMovieService extends BasicService {
  /**
   * Performs PATCH request to the users/movies endpoint with the username and a
   * unique identifier for the movie as params (needs authorization)
   * @param username Username (string)
   * @param movieId Unique movie identifier (string)
   * @returns Observable
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .patch(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        { headers: this.getAuthHeader() }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to remove a movie from a user's favorite movies
 */
export class DeleteFavoriteMovieService extends BasicService {
  /**
   * Performs a DELETE request to the users/movies endpoint with the username and a
   * unique identifier for the movie as params (needs authorization)
   * @param username Username (string)
   * @param movieId Unique movie identifier (string)
   * @returns Observable
   */
  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: this.getAuthHeader()
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to change the user's profile information
 */
export class UpdateUserService extends BasicService {
  /**
   * Performs a PUT request to the users endpoint with the (old) username as param
   * and the new information in the request body (needs authorization)
   * @param oldUserDetails Object with old user information to access username for param
   * @param newUserDetails Object with new user information
   * @returns Observable
   */
  public updateUser(oldUserDetails: any, newUserDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + oldUserDetails.Username, newUserDetails, {
        headers: this.getAuthHeader()
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to delete a user from the system permanently
 */
export class DeleteUserService extends BasicService {
  /**
   * Performs a DELETE request to the users endpoint with the username as param
   * (needs authorization)
   * @param username Username (string)
   * @returns Observable
   */
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to get a user's information
 */
export class GetUserService extends BasicService {
  /**
   * Performs a GET request to the users endpoint with the username as param
   * (needs authorization)
   * @param username Username (string)
   * @returns Observable
   */
  public getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, { headers: this.getAuthHeader() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service to get the user's favorite movies
 */
export class GetUserFavoriteMoviesService extends BasicService {
  /**
   * Performs a GET request to the users/favoritemovies endpoint with the
   * username as param (needs authorization)
   * @param username Username (string)
   * @returns Observable
   */
  public getUserFavoriteMovies(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username + '/favoritemovies', {
        headers: this.getAuthHeader()
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
