import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }
  logoutUser() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
