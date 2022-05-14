import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MsalGuard} from "@azure/msal-angular";
import {RoleGuard} from "../../guards/role.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [MsalGuard, RoleGuard],
    data: {
      expectedRole: 'User.Default'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }