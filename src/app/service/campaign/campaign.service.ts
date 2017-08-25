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
    this.http.get('http://ads.uahoy.in/uadtest/getdc/?&').subscribe(
      data => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else {
        }
      }
    );
  }

  camapigns() {
    this.http.get('http://ads.uahoy.in/uadtest/getac/?&aid=' + this.authenticationService.getUserId()).subscribe(
      data => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else {
        }
      }
    );
  }
}
