import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }
  // setter
  public setUserId(id: string) {
    this.cookieService.putObject('id', id);
  };
  public setUserScope(scope: string) {
    this.cookieService.putObject('scope', scope);
  };
  public setAccessToken(access_token: string, expires_in: any) {
    let d = new Date();
    d = new Date(d.getTime() + 1000 * expires_in);
    this.cookieService.putObject('access_token', access_token, {'expires': d.toUTCString()})
  };
  public setRefreshToken(refresh_token: string) {
    let d = new Date();
    d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    this.cookieService.putObject('refresh_token', refresh_token, {'expires': d.toUTCString()});
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
  public removeCredentials() {
    this.cookieService.removeAll();
    this.router.navigate(['/']);
  }
  public isAuthenticate() {
    if (this.getRefreshToken() !== '') {
      return true
    }
  }
 }
