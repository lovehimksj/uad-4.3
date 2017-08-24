import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add it if we have one
    if (this.authenticationService.isAuthenticate()) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authenticationService.getAccessToken()) });
    } else {
      this.authenticationService.removeCredentials();
    }
    // else {
    //   // setting the accept header
    //   req = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + this.authenticationServices.getAuthorizationHeader())});
    // }
    // default --> json
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    // setting the accept header
    // req = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + this.authenticationServices.getAuthorizationHeader())});
    return next.handle(req);
  }
}
