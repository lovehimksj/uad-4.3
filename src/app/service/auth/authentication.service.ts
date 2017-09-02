import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
	constructor(private cookieService: CookieService,
				private router: Router) {
	}

	// setter
	public setUser(username: string) {
		this.cookieService.putObject('username', username);
	};

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
	public getUser() {
		return this.cookieService.getObject('username') !== null ? this.cookieService.getObject('username') : '';
	};

	public getUserId() {
		return this.cookieService.getObject('id') !== null ? this.cookieService.getObject('id') : '';
	};

	public getUserScope() {
		return this.cookieService.getObject('scope') !== null ? this.cookieService.getObject('scope') : ''
	};

	public getAccessToken() {
		return this.cookieService.getObject('access_token') !== undefined ? this.cookieService.getObject('access_token') : '';
	};

	public getToken() {
		return this.cookieService.get('access_token') !== undefined ? this.cookieService.getObject('access_token') : '';
	};

	public getRefreshToken() {
		return this.cookieService.getObject('refresh_token') !== null ? this.cookieService.getObject('refresh_token') : ''
	};

	public removeCredentials() {
		this.cookieService.removeAll();
		this.router.navigate(['/']);
	}

	// 0 = add auth in header
	// 1 = request for access token with refresh token
	// 2 = clear account session
	public isAuthenticate() {
		if (this.getRefreshToken() !== '' && this.getAccessToken() !== '') {
			return 0;
		} else if (this.getRefreshToken() !== '' && this.getAccessToken() === '') {
			return 1;
		} else if ((this.getRefreshToken() === '' && this.getAccessToken() === '')
			|| (this.getRefreshToken() === '' && this.getAccessToken() !== '')) {
			return 2;
		}
	}
}
