import { TestBed, inject } from '@angular/core/testing';

import { RestApi } from './rest.api';

describe('RestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestApi]
    });
  });

  it('should be created', inject([RestApi], (service: RestApi) => {
    expect(service).toBeTruthy();
  }));
});
