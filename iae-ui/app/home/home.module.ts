import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";

import { HeaderComponent } from './header.component';
import { MainContainerComponent } from './maincontainer.component';
import { FooterComponent } from './footer.component';
import { LoginModule } from '../login/login.module';
import  { AppRoutingModule } from "../app-routing.module";

import { UtilsModule } from '../utils/utils.module';
import { ActivityModule } from '../activities/activities.module';

@NgModule({
  imports:      [ CommonModule , LoginModule, AppRoutingModule, UtilsModule, ActivityModule],
  declarations: [ HeaderComponent, MainContainerComponent, FooterComponent ],
  exports :[ HeaderComponent, MainContainerComponent, FooterComponent ]
})
export class HomeModule { }
