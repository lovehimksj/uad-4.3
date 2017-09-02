import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenMapper} from '../../package/mapper/token.mapper';
import {UserProvider} from '../../package/provider/user.provider';
import {Observable} from 'rxjs/Observable';
import {AccessToken} from '../../constructor/token';
import {environment} from '../../../environments/environment';
import sha256 from 'crypto-js/sha256';
import {CurrentUser} from '../../constructor/current-user';
import {SessionService} from '../../package/session/session.service';
import {Router} from '@angular/router';

@Injectable()
export class AccountService {
	private currentUser: CurrentUser;

	constructor(private httpClient: HttpClient,
				private userProvider: UserProvider,
				private sessionService: SessionService,
				private router: Router,
				private tokenMapper: TokenMapper) {
	}

	signIn(account: any): Observable<AccessToken> {
		const headers = new HttpHeaders()
			.set('Authorization', 'Basic ' + btoa(account.username + ':' + account.username));
		const uri = this.baseUri() + environment.oAuth + '?&grant_type=password&username=' + account.username + '&password=' + sha256(account.password).toString();
		return this.httpClient.post(uri, null, {headers})
			.map(response => {
				return this.tokenMapper.mapResponseToAccessToken(response);
			})
			._do(accessToken => {
				this.userProvider.setCurrentUser(accessToken);
			});
	}

	signOut() {
		this.currentUser = null;
		this.sessionService.clearSession();
		this.userProvider.setCurrentUser(null);
		this.router.navigateByUrl('/')
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
