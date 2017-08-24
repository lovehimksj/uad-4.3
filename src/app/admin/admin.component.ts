import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../service/campaign/campaign.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    this.campaignService.dashboardCampaign();
  }
  // logoutUser() {
  //   // this.authenticationService.logout();
  //   // this.router.navigate(['/']);
  // }
}
