import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../service/campaign/campaign.service';
import {AuthenticationService} from '../service/auth/authentication.service';
import {DashboardCampaign} from '../service/campaign/camapign';
import {AlertService} from '../service/http/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DashboardCampaign]
})
export class AdminComponent implements OnInit {
  public dashboardCampaigns: DashboardCampaign[];
  private loading = false;
  private errors: any;
  constructor(
    private campaignService: CampaignService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    this.dashboardCampaign();
  }
  dashboardCampaign() {
    this.loading = true;
    this.campaignService.dashboardCampaign()
      .subscribe(
        data => {
          if (data.status === 200) {
            this.dashboardCampaigns = data['mappedCampaigns'];
          }
          this.loading = false;
        },
        error => {
          this.errors = error['_body'];
          this.alertService.error(this.errors);
          this.loading = false;
        }
      )
  }
  logout() {
    this.authenticationService.removeCredentials();
  }
}
