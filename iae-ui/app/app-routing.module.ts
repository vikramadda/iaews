import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { RegistrationComponent }   from './login/registration.component';
import { LoginComponent }   from './login/login.component';

const appRoutes: Routes = [
  { path: 'registration',        component: RegistrationComponent },
  { path: 'login',        component: LoginComponent }
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
