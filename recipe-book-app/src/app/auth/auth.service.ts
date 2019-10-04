import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? : boolean;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occurred.';
      if (!errorResponse.error || !errorResponse.error.error ) {
        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already.';
      }

      return throwError(errorMessage);
    }));
  }


  public login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + environment.firebaseAPIKEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
