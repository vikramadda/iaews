import { Component } from '@angular/core';

@Component({
  selector: 'user-registration',
  templateUrl:'../app/templates/login/registration.html',
  styleUrls:['../app/templates/login/style.css']
  
})
export class RegistrationComponent  {
	
registerData:Object = {};

	registerUser(){
		console.log(this.registerData);
	}
	resetForm(){
		this.registerData={};
	}
}
