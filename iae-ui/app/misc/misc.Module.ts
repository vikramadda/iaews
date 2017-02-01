import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import  { AppRoutingModule } from "../app-routing.module";
import { AddActivityComponent } from './addactivity.component';
import { ViewActivitiesComponent } from './viewactivities.component';

@NgModule({
  imports:      [ CommonModule, ReactiveFormsModule ],
  declarations: [ AddActivityComponent, ViewActivitiesComponent],
  exports : [ AddActivityComponent, ViewActivitiesComponent ]
})
export class MiscModule { }
