import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()

export class CampaignService {
  constructor(
    private http: HttpClient
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
}
