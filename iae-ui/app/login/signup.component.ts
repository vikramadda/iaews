import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';
//import { User} from './login.model';
import { LoginService } from './login.service'

function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let passwordControl = c.get('password');
    let confirmControl = c.get('confirmPassword');

    if (passwordControl.pristine || confirmControl.pristine) {
      return null;
    }
    if (passwordControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
 }

@Component({
  moduleId: module.id,
  selector: 'user-signup',
  templateUrl:'signup.html',
  styleUrls:['style.css'],
  providers:[LoginService]
  
})
export class SignupComponent implements OnInit {
	constructor(private fb: FormBuilder, private router: Router) { }
	
	signupForm: FormGroup;
	
	firstNameMessage:string;
	lastNameMessage:string;
	emailMessage:string;
	phoneMessage:string;
	address1Message:string;
	address2Message:string;
	passwordMessage: string;
	confirmPasswordMessage: string;

	private validationMessages = {
	      required	: 	'Please enter value.',
        	pattern	: 	'Please enter a valid value.',
        	match		:	'Confirmation value not matched.',
        	minlength	:	'value is too short in length.',
        	maxlength	:	'value is too high in length.'
	};

	ngOnInit(): void {
		this.signupForm = this.fb.group({
			firstName:['', [Validators.required, Validators.minLength(3)]],
			lastName:['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
			phone:'',
			address1:['', [Validators.required, Validators.minLength(3)]],
			address2:'',
			passwordGroup:this.fb.group({
				password:['', [Validators.required, Validators.minLength(3)]],
				confirmPassword: '',
				},{validator: passwordMatcher})
			});

		const firstNameControl= this.signupForm.get('firstName');
		firstNameControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("firstName", firstNameControl));
	
		const lastNameControl= this.signupForm.get('lastName');
		lastNameControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("lastName", lastNameControl));
	
		const emailControl= this.signupForm.get('email');
		emailControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("email", emailControl));
	
		const phoneControl= this.signupForm.get('phone');
		phoneControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("phone", phoneControl));
	
		const address1Control= this.signupForm.get('address1');
		address1Control.valueChanges.debounceTime(500).subscribe(value => this.setMessage("address1", address1Control));
		
		const address2Control= this.signupForm.get('address2');
		address2Control.valueChanges.debounceTime(500).subscribe(value => this.setMessage("address2", address2Control));
	
		const passwordControl= this.signupForm.get('passwordGroup.password');
		passwordControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("password", passwordControl));
	
		const confirmPasswordControl= this.signupForm.get('passwordGroup.confirmPassword');
		confirmPasswordControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("confirmPassword", confirmPasswordControl));
	}

	resetForm(): void {
		this.signupForm.setValue({
			firstName:'',
			lastName:'',
			email:'',
			phone:'',
			address1:'',
			address2:'',
			passwordGroup:{ password:'', confirmPassword:''}
		});		
	}
	
	signup(): void {
		console.log('signup data'+JSON.stringify(this.signupForm.value));
	}

    	setMessage(message:string, c:AbstractControl): void {
    		var message1:string;
    		if ((c.touched || c.dirty) && c.errors) {
    			console.log("touched");
	            message1 = Object.keys(c.errors).map(key =>
	                this.validationMessages[key]).join(' ');
	        }

	        if(message == "firstName"){
	        	this.firstNameMessage=message1;
	        }else if(message == "lastName"){
	        	this.lastNameMessage=message1;
	        }else if(message == "email"){
	        	this.emailMessage=message1;
	        }else if(message == "phone"){
	        	this.phoneMessage=message1;
	        }else if(message == "address1"){
	        	this.address1Message=message1;
	        }else if(message == "address2"){
	        	this.address2Message=message1;
	        }else if(message == "password"){
	        	this.passwordMessage=message1;
	        }else if(message == "confirmPassword"){
	        	this.confirmPasswordMessage=message1;
	        }
    	}

	registerUser() :void {
		/*this.loginservie.addUser(this.newuser)
				.then(validUser => {
					console.log("user valid",validUser);
			      		this.gotohomepage();
			    		});*/	 	
	}

	private gotohomepage(): void {
		this.router.navigate(['']);
  	}
}
