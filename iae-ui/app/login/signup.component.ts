import { Component } from '@angular/core';
import { SignupForm} from './signup.model';

@Component({
  moduleId: module.id,
  selector: 'user-signup',
  templateUrl:'signup.html',
  styleUrls:['style.css']
  
})
export class SignupComponent  {
	
	newuser: SignupForm = new SignupForm();

	registerUser(){
		console.log(this.newuser);
	}
	resetForm(){
		this.newuser=new SignupForm();
	}
}
