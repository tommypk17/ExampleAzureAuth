import { Component, OnInit } from '@angular/core';
import {AdministrationService} from "../../../../services/administration.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  users: any[] = [];

  foundUsers: any[] = [];

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.administrationService.getUsers().subscribe((res: any[]) => {
      this.foundUsers = res;
    });
    this.administrationService.getUsersInRoles().subscribe((res: any[]) => {
      this.users = res;
    });
  }

  addUser(userId: string): void {
    this.administrationService.addUserToRole(userId, 'User.Default').subscribe((res: boolean) => {

    });
  }
}
