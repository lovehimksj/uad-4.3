import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CommunicationService {
	private $state = new Subject<any>();

	changeState(stateObject: any) {
		this.$state.next(stateObject);
	}

	getState() {
		return this.$state.asObservable();
	}
}
