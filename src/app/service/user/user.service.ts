import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {UserMapper} from '../../package/mapper/user.mapper';
import {User} from '../../constructor/user';
import {RestApi} from '../../package/communication/rest.api';

@Injectable()
export class UserService {
	constructor(private resApi: RestApi,
				private userMapper: UserMapper) {
	}

	public getUser(username: string): Observable<User> {
		return this.resApi.get<User>(`users/${username}`, null)
			.map(response => this.userMapper.mapResponseToUser(response));
	}

	public getIncommingRequests() {
		return this.resApi.get<User[]>('users/requests/incomming', null);
	}

	public modifyRelationship(userId: number, relationshipModel: any): Observable<User> {
		return this.resApi.put(`users/${userId}/relationship`, relationshipModel)
			.map(response => this.userMapper.mapResponseToUser(response));
	}
}
