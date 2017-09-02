import {Component, OnInit} from '@angular/core';
import {CampaignService} from '../../service/campaign/campaign.service';
import {Collection} from '../../constructor/collection';
import {Campaign} from '../../constructor/campaign';
import {UserProvider} from '../../package/provider/user.provider';
import {AccountService} from '../../service/account/account.service';

@Component({
	selector: 'app-advertiser',
	templateUrl: './advertiser.component.html',
	styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {
	private isLoading = false;
	private errorMessage: string;
	private campaignList: Collection<Campaign> = new Collection<Campaign>();
	private campaign: Campaign = new Campaign();
	private aId;
	constructor(private campaignService: CampaignService,
				private userProvider: UserProvider,
				private accountService: AccountService,) {
	}

	ngOnInit() {
		this.aId = this.userProvider.getUserId().toString();
		this.getAllAdvertiserCampaign();
	}

	getAllAdvertiserCampaign() {
		this.isLoading = true;
		this.errorMessage = '';
		this.campaignService.getAdvertiserCampaigns(this.aId)
			.finally(() => {
				this.isLoading = false;
			})
			.subscribe(campaigns => {
				this.campaignList = campaigns;
				console.log(this.campaignList);
			}, error => {
				this.errorMessage = error;
			});
	}

	getAdvertiserCampaign(cId: string, cType: string) {
		this.campaignService.getAdvertiserCampaignById(this.aId, cId, cType)
			.finally(() => {

			})
			.subscribe(campaign => {
				this.campaign = campaign;
				console.log(this.campaign);
		})
	}

	updateCampaignStatus(cId: string, cStatus: string) {
		console.log(cStatus);
		cStatus = cStatus.toString() === '0' ? '1' : '0';
		this.campaignService.updateCampaignStatusById(this.aId, cId, cStatus)
			.finally(() => {

			})
			.subscribe(success => {
				console.log(success);
				this.getAllAdvertiserCampaign();
			}, error => {
				console.log(error);
			});
	}
	logout() {
		this.accountService.signOut();
	}
}
