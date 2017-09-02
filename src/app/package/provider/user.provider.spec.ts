import {inject, TestBed} from '@angular/core/testing';

import {UserProvider} from './user.provider';

describe('UserProvider', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserProvider]
		});
	});

	it('should be created', inject([UserProvider], (service: UserProvider) => {
		expect(service).toBeTruthy();
	}));
});
