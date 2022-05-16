import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MsalGuard} from "@azure/msal-angular";
import {RoleGuard} from "../../guards/role.guard";
import {UnauthorizedComponent} from "./pages/unauthorized/unauthorized.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['User.Default', 'User.Administrator']
    }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
