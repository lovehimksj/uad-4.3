import { TestBed, inject } from '@angular/core/testing';

import { CampaignProvider } from './campaign.provider';

describe('CampaignProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampaignProvider]
    });
  });

  it('should be created', inject([CampaignProvider], (service: CampaignProvider) => {
    expect(service).toBeTruthy();
  }));
});
