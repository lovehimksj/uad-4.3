import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthenticationService {
  constructor(private cookieService: CookieService) { }
  // setter
  public setUserId(id: string) {
    this.cookieService.putObject('id', id);
  };
  public setUserScope(scope: string) {
    this.cookieService.putObject('scope', scope);
  };
  public setAccessToken(access_token: string) {
    this.cookieService.putObject('access_token', access_token, {'expires': '12-12-2019'})
  };
  public setRefreshToken(refresh_token: string) {
    this.cookieService.putObject('refresh_token', refresh_token, {'expires': '12-12-2019'});
  };
  // getter
  public getUserId() {
    return this.cookieService.getObject('id') !== null ? this.cookieService.getObject('id') : '';
  };
  public getUserScope() {
    return this.cookieService.getObject('scope') !== null ? this.cookieService.getObject('scope') : ''
  };
  public getAccessToken() {
    return this.cookieService.getObject('access_token') !== undefined ? this.cookieService.getObject('access_token') : '';
  };
  public getRefreshToken() {
    return this.cookieService.getObject('refresh_token') !== null ? this.cookieService.getObject('refresh_token') : ''
  };
  public setCredential(id, scope, access_token, refresh_token) {
    this.setUserId(id);
    this.setUserScope(scope);
    this.setAccessToken(access_token);
    this.setRefreshToken(refresh_token);
  }
  public isAuthenticate() {
    if (this.getRefreshToken() !== '') {
      return true
    }
  }
 }
