import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService} from "@azure/msal-angular";
import {BrowserCacheLocation, InteractionType, PublicClientApplication} from "@azure/msal-browser";
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MsalModule.forRoot( new PublicClientApplication({ // MSAL Configuration
      auth: {
        clientId: environment.AzureAd.clientId,
        authority: environment.AzureAd.authority,
        redirectUri: environment.AzureAd.redirectUri
      },
      cache: {
        cacheLocation : BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: true, // set to true for IE 11
      },
      system: {
        loggerOptions: {
          loggerCallback: () => {},
          piiLoggingEnabled: false
        }
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://localhost:5001/api/*', ['API.Read']],
      ])})

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
