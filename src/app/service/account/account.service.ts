import { Injectable } from '@angular/core';
import {RestApi} from '../../package/communication/rest.api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../../package/session/session.service';
import {TokenMapper} from '../../package/mapper/token.mapper';
import {UserProvider} from '../../package/provider/user.provider';
import {CurrentUser} from '../../constructor/current-user';
import {Observable} from 'rxjs/Observable';
import {AccessToken} from '../../constructor/token';
import {environment} from '../../../environments/environment';
import sha256 from 'crypto-js/sha256';

@Injectable()
export class AccountService {
  private currentUser: CurrentUser;
  private baseUri() {
    console.log(environment.production);
    if (environment.production === false) {
      return environment.productionUrlFalse;
    } else if (environment.production === true) {
      return environment.productionUrlTrue;
    }
  }
  constructor(
    private httpClient: HttpClient,
    private restApi: RestApi,
    private sessionServices: SessionService,
    private userProvider: UserProvider,
    private tokenMapper: TokenMapper
  ) { }
  signIn(account: any): Observable<AccessToken> {
    const headers = new HttpHeaders()
      .set('Authorization',  'Basic ' + btoa(account.username + ':' + account.username));
    const uri = this.baseUri()  + environment.oAuth + '?&grant_type=password&username=' + account.username + '&password=' + sha256(account.password).toString();
    return this.httpClient.post(uri, null, {headers})
      .map(response => {
        return this.tokenMapper.mapResponseToAccessToken(response);
      })
      ._do(accessToken => {
        this.userProvider.setCurrentUser(accessToken);
      });
  }
}
