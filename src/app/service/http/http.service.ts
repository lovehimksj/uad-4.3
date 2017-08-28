import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../auth/authentication.service';
import {UserService} from '../user/user.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add it if we have one
    if (this.authenticationService.isAuthenticate() === 0) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authenticationService.getAccessToken()) });
      if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      }
    } else if (this.authenticationService.isAuthenticate() === 1) {
      this.userService.refreshAccessToken();
    } else if (this.authenticationService.isAuthenticate() === 2) {
      this.authenticationService.removeCredentials();
    }


    return next.handle(req);
    // else {
    //   // setting the accept header
    //   req = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + this.authenticationServices.getAuthorizationHeader())});
    // }
    // default --> json
    
    // setting the accept header
    // req = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + this.authenticationServices.getAuthorizationHeader())});
  }
}
