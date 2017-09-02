import {inject, TestBed} from '@angular/core/testing';

import {TokenProvider} from './token.provider';

describe('TokenProvider', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TokenProvider]
        });
    });

    it('should be created', inject([TokenProvider], (service: TokenProvider) => {
        expect(service).toBeTruthy();
    }));
});
