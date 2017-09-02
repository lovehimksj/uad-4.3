import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {SessionService} from '../session/session.service';
import {TokenMapper} from '../mapper/token.mapper';
import {AccessToken} from '../../constructor/token';

@Injectable()
export class TokenProvider {
	private refreshTimeout = 5;

	constructor(private sessionService: SessionService,
                private tokenMapper: TokenMapper,
                private httpClient: HttpClient) {
    }

    getAccessToken(): Observable<AccessToken> {
        const accessToken = this.sessionService.getSession();
        if (!accessToken) {
            return Observable.of(null);
        }
        const now = new Date();
        const expiresIn = (accessToken.expires.getTime() - now.getTime()) / 1000 / 60;
        const useRefreshToken = accessToken.refreshToken && expiresIn < this.refreshTimeout;
        if (useRefreshToken && expiresIn > 0) {
            return this.refreshToken(accessToken.refreshToken)
                .do(response => this.sessionService.setSession(response));
        }
        if (expiresIn <= 0) {
            this.sessionService.clearSession();
            return Observable.of(null);
        }
        return Observable.of(accessToken);
    }

    private baseUri() {
        if (environment.production === false) {
            return environment.productionUrlFalse;
        } else if (environment.production === true) {
            return environment.productionUrlTrue;
        } else {
            return environment.productionUrlLocal;
        }
    }

    private refreshToken(refreshToken: string): Observable<AccessToken> {
        const refreshTokenData = `grant_type=refresh_token&refresh_token=${refreshToken}`;
        return this.httpClient.post<any>(this.baseUri(), refreshTokenData)
            .map(response => this.tokenMapper.mapResponseToAccessToken(response));
    }
}
