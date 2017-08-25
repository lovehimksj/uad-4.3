import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../service/campaign/campaign.service';
import {AuthenticationService} from '../service/auth/authentication.service';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {
  constructor(
    private camapignService: CampaignService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.camapignService.camapigns();
  }
  logout() {
    this.authenticationService.removeCredentials();
  }
}
