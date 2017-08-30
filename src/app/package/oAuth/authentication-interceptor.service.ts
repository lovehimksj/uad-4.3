import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CommunicationService } from '../communication';
import {AccessToken} from '../../constructor/token';
import {TokenProvider} from './token.provider';
import {CurrentUser} from '../../constructor/current-user';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private currentUser: CurrentUser,
    private injector: Injector,
    private communicationService: CommunicationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/authorize')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${ btoa(this.currentUser.username + ':' + this.currentUser.username)}`
        }
      });
      return next.handle(req);
    }
    const tokenProvider = this.injector.get(TokenProvider);
    return tokenProvider.getAccessToken()
      .flatMap<AccessToken, HttpEvent<any>>((accessToken) => {
        this.communicationService.changeState(accessToken);
        if (!accessToken) {
          return next.handle(req)
            .catch((error: HttpErrorResponse) => this.handleUnauthenticatedRequest(error));
        }
        const request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken.accessToken}`
          }
        });
        return next.handle(request);
      }).catch((error: HttpErrorResponse) => this.handleUnauthenticatedRequest(error));
  }
  private handleUnauthenticatedRequest(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigateByUrl('/signin');
    }
    return Observable.throw(error);
  }
}
