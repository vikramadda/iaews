import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-login',
  templateUrl : './app/templates/login/login.html',
  styleUrls:['../app/templates/login/style.css']
})

export class LoginComponent  {

public constructor(private router:Router){}

	loginData : Object = {	};
		
	validateLogin(){
		console.log(this.loginData);
	}

registration():void{
	this.router.navigate(['/registration'])
}
}
