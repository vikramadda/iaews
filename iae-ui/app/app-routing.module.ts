import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { SignupComponent }   from './login/signup.component';
import { SigninComponent }   from './login/signin.component';
import { MainContainerComponent } from './home/maincontainer.component';
import { HeaderComponent } from './home/header.component';
import { AppComponent} from './app.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup',        component: SignupComponent },
  { path: 'signin',        component: SigninComponent },
  { path: 'home',          component: MainContainerComponent},
  { path: 'home',          component: HeaderComponent}
 // { path: 'default',          component: AppComponent}
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
