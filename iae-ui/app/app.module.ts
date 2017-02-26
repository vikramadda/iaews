import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';
import { AppComponent }  from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HomeModule ,Ng2Webstorage ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers :[AuthGuard]
})
export class AppModule { }
