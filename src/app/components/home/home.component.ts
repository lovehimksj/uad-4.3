import { Component, OnInit } from '@angular/core';
// import {CurrentUser} from '../../constructor/current-user';
import {UserProvider} from '../../package/provider/user.provider';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
  	private userProvider: UserProvider,
	private router: Router
  ) { }

  ngOnInit() {
  	if (this.userProvider.getCurrentUser()) {
  		if (this.userProvider.getCurrentUser().scope === 'advertiser') {
  			this.router.navigateByUrl('/advertiser')
		} else if (this.userProvider.getCurrentUser().scope === 'admin' || this.userProvider.getCurrentUser().scope === 'adteam') {
			this.router.navigateByUrl('/admin')
		} else {
			this.router.navigateByUrl('/')
		}
	}
  	// console.log(this.userProvider.getCurrentUser());
  }
}
