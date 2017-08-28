import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from '../auth/authentication.service';


@Injectable()
export class UserService {
  private headers;
  constructor(private http: Http, private authenticationService: AuthenticationService) { }
  getHeaders(username: string) {
    return this.headers = new Headers({'Authorization': 'Basic ' + window.btoa(username + ':' + username)})
  }
  loginUser(username: string, password: string) {
    return this.http.post('https://ads.uahoy.in/uadtest/oauth/token?grant_type=password&username=' + username + '&password=' + password,
      JSON.stringify({ username: username, password: password }), { headers: this.getHeaders(username) })
      .map((response: Response) => {
        const user = response;
        // login successful if there's a jwt token in the response
        if (user.json() && user.json().access_token) {
          // this.authenticationService
          //   .setCredential(user.json().userid, user.json().scope, user.json().access_token, user.json().refresh_token);
          this.authenticationService.setUser(username);
          this.authenticationService.setUserId(user.json().userid);
          this.authenticationService.setUserScope(user.json().scope);
          this.authenticationService.setAccessToken(user.json().access_token, user.json().expires_in);
          this.authenticationService.setRefreshToken(user.json().refresh_token);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
  }
  refreshAccessToken() {
    console.log("Inside Refersh token");
    return this.http.post('https://ads.uahoy.in/uadtest/oauth/token?grant_type=refresh_token&refresh_token=' + this.authenticationService.getRefreshToken(), null, 
    { headers: this.getHeaders( this.authenticationService.getUser().toString())})
    .subscribe(
      data => {
        this.authenticationService.setAccessToken(data.json().access_token, data.json().expires_in);
        this.authenticationService.setRefreshToken(data.json().refresh_token);
        // req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authenticationService.getAccessToken()) });
      },
      error => {
        this.authenticationService.removeCredentials();
      }
    );
      // .map((response: Response) => {
      //   const refresh_token = response;
      //   console.log("Refersh token : " + refresh_token.json());
      //   // login successful if there's a jwt token in the response
      //   if (refresh_token.json() && refresh_token.json().access_token) {
      //     // this.authenticationService
      //     //   .setCredential(user.json().userid, user.json().scope, user.json().access_token, user.json().refresh_token);
      //     // this.authenticationService.setUserId(user.json().userid);
      //     // this.authenticationService.setUserScope(user.json().scope);
      //     this.authenticationService.setAccessToken(refresh_token.json().access_token, refresh_token.json().expires_in);
      //     this.authenticationService.setRefreshToken(refresh_token.json().refresh_token);
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     // localStorage.setItem('currentUser', JSON.stringify(user));
      //   }
      //   return refresh_token;
      // })
  }
  // private headers;
  // getHeaders (username: string) {
  //   return this.headers = new Headers({'Authorization': 'Basic ' + window.btoa(username + ':' + username)})
  // }
  // login(username: string, password: string) {
  //   return this.http.post('https://ads.uahoy.in/uadtest/oauth/token?grant_type=password&username=' + username + '&password=' + password,
  //     JSON.stringify({ username: username, password: password }), { headers: this.getHeaders(username) })
  //     .map((response: Response) => {
  //       // login successful if there's a jwt token in the response
  //       const user = response.json();
  //       if (user && user.access_token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //       return user;
  //     });

}
