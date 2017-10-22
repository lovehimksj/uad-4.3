import {Routes, RouterModule} from '@angular/router';
import {AdvertiserComponent} from './components/advertiser/advertiser/advertiser.component';
import {AdminComponent} from './components/admin/campaignDashboard/admin.component';

// import { RegisterComponent } from './register/index';
import {AuthenticationGuard} from './package/guards/authentication.guard';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
	{path: 'advertiser', component: AdvertiserComponent, canActivate: [AuthenticationGuard]},
	{path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard]},
	{path: '', component: HomeComponent},
	// { path: 'register', component: RegisterComponent },

	// otherwise redirect to home
	{path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
