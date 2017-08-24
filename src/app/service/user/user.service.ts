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
  login(username: string, password: string) {
    return this.http.post('https://ads.uahoy.in/uadtest/oauth/token?grant_type=password&username=' + username + '&password=' + password,
      JSON.stringify({ username: username, password: password }), { headers: this.getHeaders(username) })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response;
        if (user.json()) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.authenticationService
            .setCredential(user.json().userid, user.json().scope, user.json().access_token, user.json().refresh_token);
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
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
