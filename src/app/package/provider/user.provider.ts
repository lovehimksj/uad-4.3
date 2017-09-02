import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {SessionService} from '../session/session.service';
import {AccessToken} from '../../constructor/token';
import {CurrentUser} from '../../constructor/current-user';
import {UserService} from '../../service/user/user.service';

@Injectable()
export class UserProvider {
	private $state: BehaviorSubject<CurrentUser>;

	constructor(private userService: UserService,
				private sessionService: SessionService) {
		const currentUser = this.getCurrentUser();
		this.$state = new BehaviorSubject<CurrentUser>(currentUser);
	}

	public getCurrentUser() {
		const accessToken = this.sessionService.getSession();
		if (!accessToken) {
			return null;
		}
		const currentUser = this.mapToCurrentUser(accessToken);
		return currentUser;
	}

	public getUserId() {
		const accessToken = this.sessionService.getSession();
		if (!accessToken) {
			return null;
		}
		const currentUser = this.mapToCurrentUser(accessToken);
		return currentUser['id'];
	}

	public getCurrentUserAsObservable() {
		return this.$state.asObservable();
	}

	public setCurrentUser(accessToken: AccessToken) {
		if (accessToken) {
			this.sessionService.setSession(accessToken);
			const currentUser = this.mapToCurrentUser(accessToken);
			this.$state.next(currentUser);
		}
	}

	public updateCurrentUser(propertiesToUpdate: any) {
		const properties = Object.getOwnPropertyNames(propertiesToUpdate);
		this.sessionService.updateSession(propertiesToUpdate);
		const currentUser = this.getCurrentUser();
		this.$state.next(currentUser);
	}

	private mapToCurrentUser(accessToken: AccessToken): CurrentUser {
		const currentUser: CurrentUser = new CurrentUser(
			accessToken.userId,
			accessToken.username,
			accessToken.scope,
			// accessToken.isPrivate,
			// accessToken.isActive,
			// accessToken.pictureUri
		);
		return currentUser;
	}
}
