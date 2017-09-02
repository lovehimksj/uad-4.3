import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {CommunicationService} from '../communication';
import {AccessToken} from '../../constructor/token';
import {TokenProvider} from './token.provider';
import {SessionService} from '../session/session.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
	constructor(private router: Router,
				private injector: Injector,
				private session: SessionService,
				private communicationService: CommunicationService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.includes('/authorize')) {
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
		const errorStatus  = error.status === 0 ? 401 : error.status;
		if (errorStatus === 401) {
			this.session.clearSession();
			this.router.navigateByUrl('/');
		}
		return Observable.throw(error);
	}
}
