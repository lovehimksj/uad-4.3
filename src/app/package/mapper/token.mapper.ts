import {Injectable} from '@angular/core';
import {AccessToken} from '../../constructor/token';

@Injectable()
export class TokenMapper {
	public mapResponseToAccessToken(response: any): AccessToken {
		const accessToken = new AccessToken();
		accessToken.accessToken = response['access_token'];
		accessToken.refreshToken = response['refresh_token'];
		accessToken.userId = Number(response['userid']);
		accessToken.scope = response['scope'];
		accessToken.username = response['username'];
		accessToken.tokenType = response['token_type'];
		accessToken.expiresIn = response['expires_in'];
		accessToken.issued = new Date();
		accessToken.expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		return accessToken;
	}
}
