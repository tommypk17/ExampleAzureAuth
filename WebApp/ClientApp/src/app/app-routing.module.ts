import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {MsalGuard} from "@azure/msal-angular";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [MsalGuard] },
  { path: 'administration', loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule), canActivate: [MsalGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
