import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User} from './login.model';
import { LoginService } from './login.service';

@Component({
  moduleId: module.id,
  selector: 'user-signup',
  templateUrl:'signup.html',
  styleUrls:['style.css'],
  providers:[LoginService]
  
})
export class SignupComponent  {
	
	newuser: User = new User();
	
	constructor(private router:Router,private loginservie: LoginService){}

	registerUser() :void {
		this.loginservie.addUser(this.newuser)
				.then(validUser => {
					console.log("user valid",validUser);
			      		this.gotohomepage();
			    		});	 	
	}

	resetForm(){
		this.newuser=new User();
	}

	private gotohomepage(): void {
		this.router.navigate(['']);
  	}
}
