import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
  get<t>(url: string): Observable<t> {
    return this.http.get<t>(url);
  }
  post<t>(url: string, body: string): Observable<t> {
    return this.http.post<t>(url, body);
  }
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('currentUser')['access_token'];
    console.log(req);
    // add it if we have one
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
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
