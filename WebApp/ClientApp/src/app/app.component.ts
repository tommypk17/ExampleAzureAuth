import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, UrlSegment} from "@angular/router";
import {filter} from "rxjs";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ExampleAzureAuthWebApp';

  constructor() {

  }
}
