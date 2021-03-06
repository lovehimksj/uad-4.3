import {Injectable} from '@angular/core';
import {AccessToken} from '../../constructor/token';

@Injectable()
export class SessionService {
	private sessionKey = 'uad_session';

	setSession(token: AccessToken): void {
		const json = JSON.stringify(token);
		localStorage.setItem(this.sessionKey, json);
	}

	public getSession(): AccessToken {
		const json = localStorage.getItem(this.sessionKey);

		if (!json) {
			return null;
		}
		const data = JSON.parse(json);
		const accessToken = <AccessToken>data;
		accessToken.expires = new Date(accessToken.expires);
		accessToken.issued = new Date(accessToken.issued);
		// return access token
		return accessToken;
	}

	public updateSession(propertiesToUpdate: any) {
		const session = this.getSession();
		const properties = Object.getOwnPropertyNames(propertiesToUpdate);

		properties.forEach(propertyName => {
			session[propertyName] = propertiesToUpdate[propertyName];
		});

		this.setSession(session);
	}

	public clearSession(): void {
		localStorage.removeItem(this.sessionKey);
	}
}
