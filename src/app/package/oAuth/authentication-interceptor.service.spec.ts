import {inject, TestBed} from '@angular/core/testing';

import {AuthenticationInterceptor} from './authentication-interceptor.service';

describe('AuthenticationInterceptorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticationInterceptor]
        });
    });

    it('should be created', inject([AuthenticationInterceptor], (service: AuthenticationInterceptor) => {
        expect(service).toBeTruthy();
    }));
});
