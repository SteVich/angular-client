import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const apiUrl = 'https://univer-sv-server.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  login(data: any) : Observable<any> {
      return this.http.get(apiUrl + 'user/' + data.usernameOrEmail);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'registration', data)
      .pipe(
        tap(_ => this.log('signin')),
        catchError(this.handleError('signin', []))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
