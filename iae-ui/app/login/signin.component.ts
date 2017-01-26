import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
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

export class SigninComponent implements OnInit {
	constructor(
		private router:Router,
		private fb: FormBuilder,
		private loginservie: LoginService, 
		private location: Location
		){}
	
	signinForm:FormGroup;

	ngOnInit() : void {
		this.signinForm=this.fb.group({
			userName: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	signin(): void {
		console.log('signup data'+JSON.stringify(this.signinForm.value));
	}

	/*signinUser : User = new User();
	
	validateSignin() :void {
		this.loginservie.verifyUser(this.signinUser)
				.then(validUser => {
					console.log("user valid",validUser);
			      		this.location.back();
		    		});
	}*/
}
