import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import { HttpModule }    from '@angular/http';
import { AddActivityComponent } from './addactivity.component';
import { ViewActivitiesComponent} from './viewactivities.component';
import { AddProjectComponent } from './addproject.component';
import { ViewProjectsComponent } from './viewprojects.components';
import  { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ CommonModule, HttpModule, ReactiveFormsModule, AppRoutingModule ],
  declarations: [ AddActivityComponent, ViewActivitiesComponent,AddProjectComponent,ViewProjectsComponent ],
  exports : [ AddActivityComponent, ViewActivitiesComponent ]
})
export class ActivityModule { }
