import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  private headers;
  getHeaders (username: string) {
    return this.headers = new Headers({'Authorization': 'Basic ' + window.btoa(username + ':' + username)})
  }
  constructor(private http: Http) { }
  login(username: string, password: string) {
    return this.http.post('https://ads.uahoy.in/uadtest/oauth/token?grant_type=password&username=' + username + '&password=' + password,
      JSON.stringify({ username: username, password: password }), { headers: this.getHeaders(username) })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
