import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";

import  { AppRoutingModule } from "../app-routing.module";
import { AdminComponent } from '../admin/admin.component';

@NgModule({
  imports:      [ CommonModule, AppRoutingModule],
  declarations: [ AdminComponent ],
  exports :[ AdminComponent ]
})
export class AdminModule { }
