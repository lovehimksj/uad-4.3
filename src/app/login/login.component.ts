import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/auth/authentication.service';
import sha256 from 'crypto-js/sha256';
import {AlertService} from '../service/http/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  errors: string;
  user: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // console.log(sha256('ahoy123').toString());
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, sha256(this.model.password).toString())
      .subscribe(
        data => {
          this.user = data;
          console.log(this.user.scope);
          console.log(this.returnUrl);
          if (this.user.scope === 'admin') {
            this.router.navigate(['admin']);
          } else if (this.user.scope === 'advertiser') {
            this.router.navigate(['advertiser']);
          }
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errors = error['_body'];
          this.alertService.error(this.errors);
          console.log(this.errors);
          this.loading = false;
        }
      )
  }

}
