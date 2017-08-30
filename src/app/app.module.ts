import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { AdvertiserComponent } from './components/advertiser/advertiser.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';


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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdvertiserComponent,
    AdminComponent,
    RegisterComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    TokenProvider,
    TokenMapper,
    UserMapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
