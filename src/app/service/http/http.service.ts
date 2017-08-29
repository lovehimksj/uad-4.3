import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
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
    private injector: Injector
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
          console.log('%c Request for ' + req.urlWithParams + ' took ' + elapsed + ' ms.', 'color: Red');
        }
      })
      ._finally(() => {
        // this.loadingService.stop();
      })
      .catch((res) => {
        if (res.status === 0 || res.status === 403) {
          return userService.refreshAccessToken().flatMap((data: any) => {
            console.log(data.json().access_token);
            if (data.json().access_token !== '') {
              this.authenticationService.setAccessToken(data.json().access_token, data.json().expires_in);
              this.authenticationService.setRefreshToken(data.json().refresh_token);
              const clonedRequestRepeat = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authenticationService.getAccessToken()),
              });
              return next.handle(clonedRequestRepeat).do(event => {
                if (event instanceof HttpResponse) {
                  const elapsed = Date.now() - started;
                  console.log('%c Request for ' + req.urlWithParams + ' took ' + elapsed + ' ms.', 'color: Red');
                }
              });
            } else {
              this.authenticationService.removeCredentials();
              return Observable.throw(res);
            }
          })
        } else {
          return Observable.throw(res);
        }
      });
  }
}
