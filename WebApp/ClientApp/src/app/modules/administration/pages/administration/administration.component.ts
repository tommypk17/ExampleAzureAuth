import { Component, OnInit } from '@angular/core';
import {AdministrationService} from "../../../../services/administration.service";
import {IRole, IUser, IUserRole} from "../../../../models/administration";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  applicationUsers: IUserRole[] = [];

  directoryUsers: IUser[] = [];

  roles: IRole[] = [];

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.refresh();
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
    this.administrationService.getUsers().subscribe((res: IUser[]) => {
      this.directoryUsers = res;
    });
    this.administrationService.getUsersInRoles().subscribe((res: IUserRole[]) => {
      this.applicationUsers = res;
    });
    this.administrationService.getRoles().subscribe((res: IRole[]) => {
      this.roles = res;
    });
  }
}
