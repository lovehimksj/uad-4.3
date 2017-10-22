import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenMapper} from '../../package/mapper/token.mapper';
import {UserProvider} from '../../package/provider/user.provider';
import {Observable} from 'rxjs/Observable';
import {AccessToken} from '../../constructor/token';
import {environment} from '../../../environments/environment';
import {CurrentUser} from '../../constructor/current-user';
import {SessionService} from '../../package/session/session.service';
import {Router} from '@angular/router';
import {RestApi} from '../../package/communication/rest.api';

@Injectable()
export class AccountService {
	private currentUser: CurrentUser;

	constructor(private httpClient: HttpClient,
				private userProvider: UserProvider,
				private sessionService: SessionService,
				private router: Router,
				private restApi: RestApi,
				private tokenMapper: TokenMapper) {
	}

	public signIn(account: any): Observable<AccessToken> {
		const headers = new HttpHeaders()
			.set('Authorization', 'Basic ' + btoa(account.username + ':' + account.username));
		const uri = this.baseUri() + environment.oAuth + '?&grant_type=password&username=' + account.username + '&password=' + account.password;
		return this.httpClient.post(uri, null, {headers})
			.map(response => {
				return this.tokenMapper.mapResponseToAccessToken(response);
			})
			._do(accessToken => {
				this.userProvider.setCurrentUser(accessToken);
			});
	}

	public signOut() {
		this.currentUser = null;
		this.sessionService.clearSession();
		this.userProvider.setCurrentUser(null);
		this.router.navigateByUrl('/')
	}

	public addAdvertiser(account: any): Observable<any> {
		const url = environment.addAdvertiser;
		return this.restApi.post(url, null, account);
	}

	public getOtp(account: any): Observable<any> {
		const url = `${environment.updatePassword}&email=${account.username}`;
		return this.restApi.post(url, null, account);
	}

	public updatePassword(account: any): Observable<any> {
		const url = `${environment.updatePassword}&email=${account.username}&otp=${account.otp}&np=${account.newPassword}`;
		return this.restApi.post(url, null, null);
	}

	public changePassword(account: any): Observable<any> {
		const url = `${environment.updatePassword}&op=${account.oldPassword}&np=${account.newPassword}`;
		return this.restApi.post(url, null, account);
	}

	private baseUri() {
		console.log(environment.production);
		if (environment.production === false) {
			return environment.productionUrlFalse;
		} else if (environment.production === true) {
			return environment.productionUrlTrue;
		}
	}
}
