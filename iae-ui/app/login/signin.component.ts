import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './login.model';
import { Location }               from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'user-signin',
  templateUrl : 'signin.html',
  styleUrls:['style.css'],
  providers:[LoginService]
})

export class SigninComponent  {

	constructor(
		private router:Router,
		private loginservie: LoginService, 
		private location: Location
		){}
	
	signinUser : User = new User();
	
	validateSignin() :void {
		this.loginservie.verifyUser(this.signinUser)
				.then(validUser => {
					console.log("user valid",validUser);
			      		this.location.back();
		    		});
	}
}
