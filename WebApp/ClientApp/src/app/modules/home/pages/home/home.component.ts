import { Component, OnInit } from '@angular/core';
import {FilesService} from "../../../../services/files.service";
import {MsalService} from "@azure/msal-angular";
import {AccountInfo} from "@azure/msal-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: AccountInfo | undefined;
  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    if(this.msalService.instance.getAllAccounts().length > 0){
      this.user = this.msalService.instance.getAllAccounts()[0];
    }
  }

}
