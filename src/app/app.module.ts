import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CookieModule} from 'ngx-cookie';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {routing} from './app.routing';
import {AdvertiserComponent} from './components/advertiser/advertiser/advertiser.component';
import {AdminComponent} from './components/admin/campaignDashboard/admin.component';
import {RegisterComponent} from './components/register/register.component';


import {AuthenticationInterceptor} from './package/oAuth/authentication-interceptor.service';
import {CommunicationService, RestApi} from './package/communication';
import {SessionService} from './package/session/session.service';
import {AuthenticationGuard} from './package/guards/authentication.guard';
import {AccountService} from './service/account/account.service';
import {TokenProvider} from './package/oAuth/token.provider';
import {TokenMapper} from './package/mapper/token.mapper';
import {UserMapper} from './package/mapper/user.mapper';
import {UserProvider} from './package/provider/user.provider';
import {UserService} from './service/user/user.service';
import {HomeComponent} from './components/home/home.component';
import {CampaignService} from './service/campaign/campaign.service';
import {CampaignMapper} from './package/mapper/campaign.mapper';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AdvertiserCampaignComponent} from './components/advertiser/advertiser.camapign/advertiser.camapign';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CampaignComponent } from './components/advertiser/campaign/campaign.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AdvertiserComponent,
		AdminComponent,
		RegisterComponent,
		HomeComponent,
		ForgotPasswordComponent,
		AdvertiserCampaignComponent,
		HeaderComponent,
		SideNavComponent,
		FooterComponent,
		CampaignComponent
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
		UserProvider,
		RestApi,
		CommunicationService,
		SessionService,
		AuthenticationGuard,
		AccountService,
		UserService,
		CampaignService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true,
		},
		TokenProvider,
		TokenMapper,
		CampaignMapper,
		UserMapper
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
