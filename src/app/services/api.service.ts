import { Injectable, Injector, PLATFORM_ID, Inject } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of as observableOf, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private signUpUrl = 'signUp';
  private logInUrl = 'logIn';
  serverCookie: string;
  headers: HttpHeaders;
  noCacheHeaders: HttpHeaders;
  currentUser: "";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {
      if (isPlatformServer(this.platformId)) {
        const serverHeaders = this.injector.get('request').headers;
        const serverUserAgent = serverHeaders['user-agent'];
        this.serverCookie = serverHeaders.cookie;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*', 'Cookie': this.serverCookie });
        this.noCacheHeaders = new HttpHeaders(
          { 'Content-Type': 'application/json', 'Accept': '*/*', 'Cache-Control': 'no-cache', 'Cookie': this.serverCookie });
      } else {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*' });
        this.noCacheHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*', 'Cache-Control': 'no-cache' });
      }
  }


  signUp(profileForm): Observable<any> {
    return this.http.post((environment.messageUrl + this.signUpUrl),
      profileForm,
      { headers: this.noCacheHeaders }
    ).pipe(map(response => response), catchError(error => {
      return observableOf<any>(error);
    }));
  }

  login(loginForm):Observable<any> {
    return this.http.post((environment.messageUrl + this.logInUrl),
      loginForm,
      { headers: this.noCacheHeaders }
    ).pipe(map(response => response), catchError(error => {
      return observableOf<any>(error);
    }));
  }
  
}

