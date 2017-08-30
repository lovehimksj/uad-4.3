import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account/account.service';
import { UserLogin } from '../../constructor/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isLoading = false;
  private errorMessage: string;
  private account: UserLogin = new UserLogin();
  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }
  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl);
  }
  login() {
      this.isLoading = true;
      this.errorMessage = '';
      this.accountService.signIn(this.account)
      .finally(() => {
      this.isLoading = false;
      })
      .subscribe(response => {
      this.router.navigateByUrl('/');
      }, error => {
      this.errorMessage = error.error.error;
      });
  }
}
