import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { SigninComponent } from './signin.component';
import { SignupComponent} from './signup.component';
import  { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule,ReactiveFormsModule, AppRoutingModule ],
  declarations: [ SigninComponent, SignupComponent ],
  exports : [ SigninComponent, SignupComponent ]
})
export class LoginModule { }
