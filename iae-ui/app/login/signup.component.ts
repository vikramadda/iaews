import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GenericValidator } from '../utils/generic-validator';
import { MyValidators } from '../utils/field-validators';
import { LoginService } from './login.service';

@Component({
  moduleId: module.id,
  selector: 'user-signup',
  templateUrl:'signup.html',
  styleUrls:['style.css'],
  providers:[LoginService]
  
})
export class SignupComponent implements OnInit {
	@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
	
	pageTitle:string = 'Sign Up!';
    	displayMessage: { [key: string]: string } = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	signupForm: FormGroup;
	errorMessage:string;


	constructor(private fb: FormBuilder, 
		private router: Router) {
		
		this.validationMessages = {
	            firstName: {
	                required: 'First name is required.',
	                minlength: 'First name is too short.'
	            },
	            lastName: {
	                required: 'Last name is required.',
	                minlength: 'Last name is too short.'
	            },
	            email: {
	                required: 'Email is required.',
	                pattern: 'Invalid email Address.'
	            },
	            phone: {
	                required: 'phone number is required',
	                minlength: 'phone number is too short.',
	                maxlength:'Phone number is long.'
	            },
	            address1: {
	                required: 'Address1 is required',
	                minlength: 'Adress1 is too short.'
	            },
	            password: {
	                required: 'password is required',
	                minlength: 'password is too short.'
	            },
	            confirmPassword: {
	                required: 'confirm Password is required',
	                minlength: 'confirm Password is too short.'
	            },

        	};
        	this.genericValidator = new GenericValidator(this.validationMessages);
	}
	
	ngOnInit(): void {
		this.signupForm = this.fb.group({
			firstName:['', [Validators.required, Validators.minLength(3)]],
			lastName:['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
			phone:['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
			address1:['', [Validators.required, Validators.minLength(3)]],
			address2:'',
			passwordGroup:this.fb.group({
				password:['', [Validators.required, Validators.minLength(3)]],
				confirmPassword: '',
				},{validator: MyValidators.passwordMatcher})
			});
	}

	ngAfterViewInit(): void {
       	let controlBlurs: Observable<any>[] = this.formInputElements
            	.map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
      	Observable.merge(this.signupForm.valueChanges, ...controlBlurs).debounceTime(800)
      		.subscribe(value => {
            		this.displayMessage = this.genericValidator.processMessages(this.signupForm);
        		});
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

}