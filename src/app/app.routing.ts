import { Routes, RouterModule } from '@angular/router';
import { AdvertiserComponent } from './components/advertiser/advertiser.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './register/index';
import {AuthenticationGuard} from './package/guards/authentication.guard';

const appRoutes: Routes = [
  { path: 'advertiser', component: AdvertiserComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard] },
  { path: '', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
