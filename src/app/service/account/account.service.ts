import { Injectable } from '@angular/core';
import {RestApi} from '../../package/communication/rest.api';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../package/session/session.service';
import {TokenMapper} from '../../package/mapper/token.mapper';
import {UserProvider} from '../../package/provider/user.provider';
import {CurrentUser} from '../../constructor/current-user';
import {Observable} from 'rxjs/Observable';
import {AccessToken} from '../../constructor/token';
import {environment} from '../../../environments/environment';


@Injectable()
export class AccountService {
  private currentUser: CurrentUser;
  constructor(
    private httpClient: HttpClient,
    private restApi: RestApi,
    private sessionServices: SessionService,
    private userProvider: UserProvider,
    private tokenMapper: TokenMapper
  ) { }
  signIn(account: any): Observable<AccessToken> {
    const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;
    // return this.httpClient.post(environment.oAuth, body)
    //   .map(response => {
    //     return this.tokenMapper.mapResponseToAccessToken(response);
    //   })
    //   ._do(accessToken => {
    //     this.userProvider.setCurrentUser(accessToken);
    //   });
    return this.restApi.post(environment.oAuth, body)
      .map(response => {
        return this.tokenMapper.mapResponseToAccessToken(response);
      })
      ._do(accessToken => {
        this.userProvider.setCurrentUser(accessToken);
      });
  }
}
