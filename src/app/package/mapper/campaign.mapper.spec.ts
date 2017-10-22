import { TestBed, inject } from '@angular/core/testing';

import { CampaignMapper } from './campaign.mapper';

describe('CampaignMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampaignMapper]
    });
  });

  it('should be created', inject([CampaignMapper], (service: CampaignMapper) => {
    expect(service).toBeTruthy();
  }));
});
