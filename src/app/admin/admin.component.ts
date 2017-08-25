import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../service/campaign/campaign.service';
import {AuthenticationService} from '../service/auth/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private campaignService: CampaignService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.campaignService.dashboardCampaign();
  }
  logout() {
    this.authenticationService.removeCredentials();
  }
}
