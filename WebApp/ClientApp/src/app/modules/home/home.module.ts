import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    HomeComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
