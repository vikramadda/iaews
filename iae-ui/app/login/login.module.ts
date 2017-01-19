import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule }   from '@angular/forms';

import { LoginComponent } from './login.component';
import { RegistrationComponent} from './registration.component';
import  { AppRoutingModule } from "../app-routing.module";

@NgModule({
  imports:      [ CommonModule, FormsModule, AppRoutingModule ],
  declarations: [ LoginComponent, RegistrationComponent ],
  exports : [ LoginComponent, RegistrationComponent ]
})
export class LoginModule { }
