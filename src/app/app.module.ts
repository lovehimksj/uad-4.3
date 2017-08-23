import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthenticationService} from './service/auth/authentication.service';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { CampaignService } from './service/campaign/campaign.service';
import { ApiInterceptor } from './service/http/http.service';
import { AlertComponent } from './components/alert/alert.component';
import {AlertService} from './service/http/alert.service';
import {UserService} from './service/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdvertiserComponent,
    AdminComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    routing,
    CookieModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CampaignService,
    AlertService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
