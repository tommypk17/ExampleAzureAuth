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

  unauthorized: boolean = false;

  constructor(private router: Router, private msalService: MsalService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(
      (x) => {
        let route = (x as NavigationEnd).url;
        if(route == '/unauthorized'){
          this.unauthorized = true;
        }
      });
  }

  retry(): void {
      this.msalService.instance.loginRedirect();
  }
}
