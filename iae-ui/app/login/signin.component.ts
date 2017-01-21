import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'user-signin',
  templateUrl : 'signin.html',
  styleUrls:['style.css']
})

export class SigninComponent  {

public constructor(private router:Router){}

	signinData : Object = {	};
		
	validateSignin(){
		console.log(this.signinData);
	}

	/*registration():void{
		this.router.navigate(['/registration'])
	}*/
}
