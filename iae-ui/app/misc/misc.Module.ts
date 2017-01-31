import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";

import  { AppRoutingModule } from "../app-routing.module";
import { AddActivitiesComponent } from './addactivites.component';
import { ViewActivitiesComponent } from './viewactivities.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ AddActivitiesComponent, ViewActivitiesComponent],
  exports : [ AddActivitiesComponent, ViewActivitiesComponent ]
})
export class MiscModule { }
