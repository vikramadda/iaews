import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule }   from '@angular/forms';

import { SigninComponent } from './signin.component';
import { SignupComponent} from './signup.component';
import  { AppRoutingModule } from "../app-routing.module";

@NgModule({
  imports:      [ CommonModule, FormsModule, AppRoutingModule ],
  declarations: [ SigninComponent, SignupComponent ],
  exports : [ SigninComponent, SignupComponent ]
})
export class LoginModule { }
