import {Component, OnInit} from '@angular/core';
import {Campaign} from '../../../constructor/campaign';
import {Collection} from '../../../constructor/collection';
import {CampaignService} from '../../../service/campaign/campaign.service';
import {AccountService} from '../../../service/account/account.service';
// import {CampaignService} from '../../service/campaign/campaign.service';
// import {AuthenticationService} from '../../service/auth/authentication.service';
// import {DashboardCampaign} from '../../service/campaign/camapign';
// import {AlertService} from '../../service/http/alert.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
	// providers: [DashboardCampaign]
})
export class AdminComponent implements OnInit {
	private isLoading = false;
	private errorMessage: string;
	private campaignList: Collection<Campaign> = new Collection<Campaign>();

	constructor(private campaignService: CampaignService,
				private accountService: AccountService,
				// private alertService: AlertService,
	) {
	}

	ngOnInit() {
		this.getAllDashboardCampaign();
	}

	getAllDashboardCampaign() {
		this.isLoading = true;
		this.errorMessage = '';
		this.campaignService.getAllCampaign()
			.finally(() => {
				this.isLoading = false;
			})
			.subscribe(campaigns => {
				this.campaignList = campaigns;
			}, error => {
				this.errorMessage = error;
			});
	}

	logout() {
		this.accountService.signOut();
	}
}
