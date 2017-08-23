import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {
  constructor() { }
  logoutUser() {
    // this.authenticationService.logout();
    // this.router.navigate(['/']);
  }
  ngOnInit() {
  }
}
