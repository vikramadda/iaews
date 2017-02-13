import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import { HttpModule }    from '@angular/http';
import { SigninComponent } from './signin.component';
import { SignupComponent} from './signup.component';
import  { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { IAEModalModule } from '../dialog/iae-modal.module';

@NgModule({
  imports:      [ CommonModule, HttpModule, ReactiveFormsModule, AppRoutingModule, IAEModalModule ],
  declarations: [ SigninComponent, SignupComponent ],
  exports : [ SigninComponent, SignupComponent ]
})
export class LoginModule { }
