import { Component, OnInit } from '@angular/core';
import {AdministrationService} from "../../../../services/administration.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  applicationUsers: any[] = [];

  directoryUsers: any[] = [];

  roles: IRole[] = [];

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.administrationService.getUsers().subscribe((res: any[]) => {
      this.directoryUsers = res;
    });
    this.administrationService.getUsersInRoles().subscribe((res: any[]) => {
      this.applicationUsers = res;
    });

    this.roles = [
      { label: 'Default', value: "User.Default"},
      { label: 'Administrator', value: "User.Administrator"}
    ]
  }

  addUser(userId: string, role: string): void {
    this.administrationService.addUserToRole(userId, role).subscribe((res: boolean) => {
      if(res){
        alert(`SUCCESS: User added to ${role} role.`)
      }else{
        alert(`FAILURE: User not added to ${role} role.`)
      }
    });
  }

  removeUser(userId: string): void {
    this.administrationService.removeUser(userId).subscribe((res: boolean) => {
      if(res){
        alert(`SUCCESS: User removed from application`);
      }else{
        alert(`FAILURE: User not removed from application`);
      }
    });
  }

  refresh(): void {
    this.administrationService.getUsers().subscribe((res: any[]) => {
      this.directoryUsers = res;
    });
    this.administrationService.getUsersInRoles().subscribe((res: any[]) => {
      this.applicationUsers = res;
    });
  }
}


export interface IRole {
  label: string;
  value: string;
}
