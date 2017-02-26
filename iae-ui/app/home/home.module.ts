import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";

import { HeaderComponent } from './header.component';
import { MainContainerComponent } from './maincontainer.component';
import { FooterComponent } from './footer.component';
import { IntroductionComponent } from './introduction.component';
import { UpComingEventsComponent} from './upcomingevents.component';
import { SupportersTalkComponent } from './supporterstalk.component';
import  { AchievementsComponent} from './achievements.components';

import { LoginModule } from '../login/login.module';
import  { AppRoutingModule } from "../app-routing.module";

import { UtilsModule } from '../utils/utils.module';
import { ActivityModule } from '../activities/activities.module';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  imports:      [ CommonModule ,AdminModule, LoginModule, AppRoutingModule, UtilsModule, ActivityModule],
  declarations: [ 
  	HeaderComponent, 
  	MainContainerComponent, 
  	FooterComponent,
  	IntroductionComponent,
  	UpComingEventsComponent,
  	SupportersTalkComponent,
  	AchievementsComponent ],
  exports :[ HeaderComponent, MainContainerComponent, FooterComponent ]
})
export class HomeModule { }
