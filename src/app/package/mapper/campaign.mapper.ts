import { Injectable } from '@angular/core';
import {Campaign} from '../../constructor/campaign';
import {Status} from '../../enum/status';

@Injectable()
export class CampaignMapper {
	constructor() { }
	public mapResponseToCampaign(response: any, cType: string): Campaign {
		const campaign = new Campaign();
		switch (cType) {
			case 'ca' :
				const res = response['campaign'];
				campaign.campaignId = res['campaignId'];
				campaign.campaignName = res['campaignName'];

				if (res.campaignStatus === 0) {
					campaign.campaignStatus = Status.INACTIVE;
				}else if (res.campaignStatus === 1) {
					campaign.campaignStatus = Status.ACTIVE;
				}else if (res.campaignStatus === 2) {
					campaign.campaignStatus = Status.PAUSED;
				}
				break;
			case 'ta' :
				response = response['campaign'];
				break;
			case 'lo' :
				response = response['campaignLocations'];
				break;
			default:
				return campaign;
		}

		return campaign;
	}
}
