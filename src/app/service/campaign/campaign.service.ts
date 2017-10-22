import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Campaign} from '../../constructor/campaign';
import {RestApi} from '../../package/communication/rest.api';
import {CampaignMapper} from '../../package/mapper/campaign.mapper';
import {environment} from '../../../environments/environment';
import {HttpParams} from '@angular/common/http';
import {Collection} from '../../constructor/collection';

@Injectable()

export class CampaignService {

	constructor(private restApi: RestApi,
				private campaignMapper: CampaignMapper) {
	}

	public getAllCampaign(): Observable<Collection<Campaign>> {
		const url = environment.getDashboardCampaigns;
		return this.restApi.get<Collection<Campaign>>(url, null);
	}

	public getAdvertiserCampaigns(id: string): Observable<Collection<Campaign>> {
		const url = environment.getAdvertiserCampaigns;
		const requestParam = new HttpParams().set('aid', id);
		return this.restApi.get<Collection<Campaign>>(url, requestParam);
	}

	public getAdvertiserCampaignById(aId: string, cId: string, cType: string): Observable<Campaign> {
		const url = environment.getCampaign;
		const requestParam = new HttpParams().set(cType, 'true').set('cid', cId).set('aid', aId);
		return this.restApi.get<Campaign>(url, requestParam)
			.map(response => this.campaignMapper.mapResponseToCampaign(response, cType));
	}

	public updateCampaignStatusById(aId: string, cId: string, cStatus: string) {
		const url = environment.updateStatus;
		const requestParam = new HttpParams().set('status', cStatus).set('cid', cId).set('aid', aId);
		return this.restApi.post(url, requestParam, null);
	}
}
