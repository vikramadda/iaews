import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { SignupComponent }   from './login/signup.component';
import { SigninComponent }   from './login/signin.component';
import { MainContainerComponent } from './home/maincontainer.component';
import { AddActivityComponent } from './activities/addactivity.component';
import { AddProjectComponent } from './activities/addproject.component';
import { ViewActivitiesComponent } from './activities/viewactivities.component';
import { ViewProjectsComponent } from './activities/viewprojects.components';
import { HeaderComponent } from './home/header.component';
import { AppComponent} from './app.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { IntroductionComponent } from './home/introduction.component';
import { UpComingEventsComponent } from './home/upcomingevents.component';
import { SupportersTalkComponent } from './home/supporterstalk.component';
import { AchievementsComponent} from './home/achievements.components';
import { ContactUSComponent } from './home/contactus.component';
import { GalleryComponent } from './home/gallery.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup',        component: SignupComponent },
  { path: 'signin',        component: SigninComponent },
  { path: 'home',          component: MainContainerComponent },
  { path: 'activity/:id',  component: AddActivityComponent, canActivate :[AuthGuard] },
  { path: 'project/:id',  component: AddProjectComponent, canActivate :[AuthGuard] },
  { path: 'activities/:id',    component: ViewActivitiesComponent },
  { path: 'projects',      component: ViewProjectsComponent },
  { path: 'admin',         component: AdminComponent, canActivate :[AuthGuard] },
  { path: 'about',         component: IntroductionComponent },
  { path: 'upcomingEvents/:type',component: UpComingEventsComponent },
  { path:'supportersTalk', component : SupportersTalkComponent},
  { path:'achievements/:type',component:AchievementsComponent},
  { path:'contactus', component:ContactUSComponent},
  { path:'gallery', component:GalleryComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
