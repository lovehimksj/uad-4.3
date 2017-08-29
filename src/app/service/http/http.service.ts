import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {AuthenticationService} from '../auth/authentication.service';
import {UserService} from '../user/user.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {CookieService} from 'ngx-cookie';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  cachedRequests: Array<HttpRequest<any>> = [];
  constructor(
    private authenticationService: AuthenticationService,
    private injector: Injector,
    private cookieService: CookieService
  ) {}
  // public collectFailedRequest(request): void {
  //   this.cachedRequests.push(request);
  // }
  //
  // public retryFailedRequests(): void {
  //   // retry the requests. this method can
  //   // be called after the token is refreshed
  // }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add it if we have one
    // let errStatus: number;
    const userService = this.injector.get(UserService);
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authenticationService.getAccessToken())
    });
    const started = Date.now();
    return next.handle(clonedRequest)
      .do(event => {
        if (event instanceof HttpResponse) {

          const elapsed = Date.now() - started;
          console.log('%c Request for ' + req.urlWithParams + ' took ' + elapsed + ' ms.', 'background: #222; color: yellow');
        }
      })
      ._finally(() => {
        // this.loadingService.stop();
      })
      .catch((res) => {
        if (res.status === 0 || res.status === 403) {
          // this.loadingService.start();
          return userService.refreshAccessToken().flatMap((data: any) => {
            this.authenticationService.setAccessToken(data.json().access_token, data.json().expires_in);
            this.authenticationService.setRefreshToken(data.json().refresh_token);
            // if (data.token !== '') {
            //   localStorage.setItem('currentUser', JSON.stringify(data.user));
            //   localStorage.setItem('currentUserPermissions', JSON.stringify(data.permissions));
            //   localStorage.setItem('JWToken', data.token);
            // } else {
            //   localStorage.removeItem('currentUser');
            //   localStorage.removeItem('currentUserPermissions');
            //   localStorage.removeItem('JWToken');
            //   this.router.navigate(['./auth/login']);
            //   return Observable.throw(res);
            // }
            const clonedRequestRepeat = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + this.authenticationService.getAccessToken()),
              // url: this.fixUrl(req.url)
            });
            return next.handle(clonedRequestRepeat).do(event => {
              if (event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                console.log('%c Request for ' + req.urlWithParams + ' took ' + elapsed + ' ms.', 'background: #222; color: yellow');
              }
            });
          })
        } else {
          return Observable.throw(res);
        }
      });
  }
}
