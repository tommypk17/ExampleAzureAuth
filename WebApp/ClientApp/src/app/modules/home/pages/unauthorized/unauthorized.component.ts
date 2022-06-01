import { Component, OnInit } from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {Router} from "@angular/router";
import {EndSessionRequest, RedirectRequest, SilentRequest} from "@azure/msal-browser";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private router: Router, private msalService: MsalService) { }

  ngOnInit(): void {

  }

  retry(): void {
    //force a token refresh, roles are only added to a token when refreshed.
    let loginReq: SilentRequest = {
      redirectUri: '/',
      scopes: ['https://api.exampleauth.tkov.dev/API.Read'],
      account: this.msalService.instance.getAllAccounts()[0],
      forceRefresh: true
    }
    this.msalService.instance.acquireTokenSilent(loginReq).then(() => {
      this.router.navigate(['/']);
    })
  }
}
