import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  ngOnInit() {
  }
  logoutUser() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
