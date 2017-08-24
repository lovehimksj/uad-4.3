import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    console.log(this.authenticationService.getUserScope());
    if (this.authenticationService.isAuthenticate()) {
      if (this.authenticationService.getUserScope() === 'advertiser') {
        this.router.navigate(['advertiser']);
      } else if (this.authenticationService.getUserScope() === 'admin' || this.authenticationService.getUserScope() === 'adteam') {
        this.router.navigate(['admin'])
      } else {
        this.router.navigate(['/'])
      }
    }
  }
}
