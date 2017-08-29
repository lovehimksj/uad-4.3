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
    return this.http.post(
      'http://ads.uahoy.in/uadtest/oauth/token?grant_type=password&username=' + username + '&password=' + password,
      null,
      { headers: this.getHeaders(username) })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response.json() && response.json().access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.authenticationService.setUser(username);
          this.authenticationService.setUserId(response.json().userid);
          this.authenticationService.setUserScope(response.json().scope);
          this.authenticationService.setAccessToken(response.json().access_token, response.json().expires_in);
          this.authenticationService.setRefreshToken(response.json().refresh_token);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
        }
        return response;
      })
  }
  refreshAccessToken() {
    const url = 'https://ads.uahoy.in/uadtest/oauth/token?grant_type=refresh_token&refresh_token=';
    return this.http.post(
      url + this.authenticationService.getRefreshToken(),
      null,
      {headers: this.getHeaders(this.authenticationService.getUser().toString())})
        .map((response: Response) => {
      console.log('set access token')
          this.authenticationService.setAccessToken(response.json().access_token, response.json().expires_in);
          this.authenticationService.setRefreshToken(response.json().refresh_token);
          return response;
        })
  }
}
