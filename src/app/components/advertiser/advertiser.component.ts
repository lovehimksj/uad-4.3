import { Component, OnInit } from '@angular/core';
// import {CampaignService} from '../../service/campaign/campaign.service';
// import {AuthenticationService} from '../../service/auth/authentication.service';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {
  constructor(
    // private campaignService: CampaignService,
    // private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // this.advertiserCampaigns();
    // this.campaignService.camapigns();
  }

  //
  //   advertiserCampaigns() {
  //   this.campaignService.getCampaigns()
  //     .subscribe(
  //       data => {
  //         if (data.status === 200) {
  //           console.log(data);
  //           // this.dashboardCampaigns = data['mappedCampaigns'];
  //         }
  //         // this.loading = false;
  //       },
  //       error => {
  //         // this.errors = error['_body'];
  //         // this.alertService.error(this.errors);
  //         // this.loading = false;
  //       }
  //     )
  // };
  logout() {
    // this.authenticationService.removeCredentials();
  }
}
