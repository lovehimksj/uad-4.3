import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable()

export class CampaignService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }
  dashboardCampaign() {
    return this.http.get('http://ads.uahoy.in/uadtest/getdc/?&')
      .map((response: Response) => {
        return response
      });
  }

  getCampaigns() {
    return this.http.get('http://ads.uahoy.in/uadtest/getac/?&aid=' + this.authenticationService.getUserId())
      .map((response: Response) => {
        return response
      });
  }
}
