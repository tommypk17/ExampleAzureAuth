import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {MsalService} from "@azure/msal-angular";
import {TokenClaims} from "@azure/msal-common";
import {AuthenticationResult, SilentRequest} from "@azure/msal-browser";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/auth')
    .build();

  constructor(private msalService: MsalService, private router: Router) {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addAuthorizationListener = () => {
    this.hubConnection.on('Authorization', (data) => {
      let currentToken = this.msalService.instance.getAllAccounts()[0].idTokenClaims as TokenClaims;
      let numberOfChecks = 0;
      let recheckAuth = setInterval(() => {
        if(this.msalService.instance.getAllAccounts()[0].localAccountId == data){
          let loginReq: SilentRequest = {
            redirectUri: '/',
            scopes: ['https://api.exampleauth.tkov.dev/API.Read'],
            account: this.msalService.instance.getAllAccounts()[0],
            forceRefresh: true
          }
          this.msalService.acquireTokenSilent(loginReq).subscribe((res: AuthenticationResult) => {
            let claims: TokenClaims = res.idTokenClaims;
            if(currentToken.roles?.sort().toString() != claims.roles?.sort().toString()){
              clearInterval(recheckAuth);
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            }
          });
        }
      }, 7200)
    });
  }
}
