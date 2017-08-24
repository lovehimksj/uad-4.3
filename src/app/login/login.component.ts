import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import sha256 from 'crypto-js/sha256';
import {AlertService} from '../service/http/alert.service';
import {UserService} from '../service/user/user.service';
import {AuthenticationService} from '../service/auth/authentication.service';

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
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.loading = true;
    this.userService.login(this.model.username, sha256(this.model.password).toString())
      .subscribe(
        data => {
          if (data.status === 200) {
            this.user = data.json();
            if (this.user.scope === 'admin' || this.user.scope === 'adteam') {
              console.log(this.user.scope);
              this.router.navigate(['admin']);
            } else if (this.user.scope === 'advertiser') {
              console.log(this.user.scope);
              this.router.navigate(['advertiser']);
            }
            this.loading = false;
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
