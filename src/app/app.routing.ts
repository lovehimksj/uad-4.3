import { Routes, RouterModule } from '@angular/router';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/index';
import { AuthGuard } from './guard/auth.guard';

const appRoutes: Routes = [
  { path: 'advertiser', component: AdvertiserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
