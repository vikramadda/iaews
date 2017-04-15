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
import { DialogService } from '../dialog/dialog.service';
import { AlertComponent } from '../dialog/alert.component';

import { User, SecurityQuestion, Role } from './login.model';

@Component({
  moduleId: module.id,
  selector: 'user-signup',
  templateUrl:'signup.html',
  styleUrls:['style.css'],
  providers:[LoginService]
  
})
export class SignupComponent implements OnInit {
	@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
	
	private pageTitle:string = 'Sign Up!';
    	private displayMessage: { [key: string]: string } = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;
	private signupForm: FormGroup;

	rolesList:Role[];
	securityQuestionsList:SecurityQuestion[];


	constructor ( private fb: FormBuilder,
			  private loginservice:LoginService,
			  private router: Router,
			  private dialogService:DialogService
			) 
	{
		
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
	                required: 'Phone Number is required.',
	                minlength: 'Phone Number should be 10 digit.',
	                maxlength:'Phone Number should be 10 digit.',
	                pattern: 'Invalid Phone Number.'
	            },
	            password: {
	                required: 'password is required',
	                minlength: 'password is too short.'
	            },
	            confirmPassword: {
	                required: 'confirm Password is required',
	                minlength: 'confirm Password is too short.'
	            },
	            passwordMisMatch:{
	            	error:'Confirmation does not match the password.',
	            },
	            role:{
	            	required:'Role is required.'
	            },
	            securityQuestion1:{
	            	required:'Security Question 1 is required.'
	            },
	            securityAnswer1:{
	            	required:'Security Answer is required.',
	            	minlength: 'Security answer should be minimum of 3 digits.'
	            },
	            securityQuestion2:{
	            	required:'Security Question 2 is required.'
	            },
	            securityAnswer2:{
	            	required:'Security Answer is required.',
	            	minlength: 'Security answer should be minimum of 3 digits.'
	            }

        	};

        	this.genericValidator = new GenericValidator(this.validationMessages);
	}
	
	ngOnInit(): void {
		this.loadingDBDefaults();
		this.signupForm = this.fb.group({
			firstName:['', [Validators.required, Validators.minLength(3)]],
			lastName:['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
			phone:['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),
					Validators.pattern('[7-9]+[0-9]+')]	],
			passwordGroup:this.fb.group({
				password:['', [Validators.required, Validators.minLength(3)]],
				confirmPassword: '',
				},{validator: MyValidators.passwordMatcher}),
			
			role:['', [Validators.required] ],
			securityQuestion1:['', [Validators.required] ],
			securityAnswer1:['', [Validators.required, Validators.minLength(3)] ],
			securityQuestion2:['', [Validators.required] ],
			securityAnswer2:['', [Validators.required,Validators.minLength(3)] ]
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
			passwordGroup:{ password:'', confirmPassword:''},
			role:'',
			securityQuestion1:'',
			securityAnswer1:'',
			securityQuestion2:'',
			securityAnswer2:''
		});		
	}
	
	signup(): void {
		console.log('Form data'+JSON.stringify(this.signupForm.value));
		let newUser:User=this.convertToModel(this.signupForm.value);
		console.log('User'+JSON.stringify(newUser));
		this.loginservice.saveUser(newUser).subscribe(
			message => this.doAlert("Success!","User Registration success"),
			error => this.doAlert("Error!",error)
			);
	}

	loadingDBDefaults():void {
		this.loginservice.listRoles().subscribe(roles => this.rolesList=roles);
		this.loginservice.listSecurityQuestions().subscribe(securityQuestions => this.securityQuestionsList=securityQuestions);
	}

	private copyValues(srcObj:any, destObj:any):void {
	  	for (var key in destObj) {
	    		if(destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key))
	      		destObj[key] = srcObj[key];
	  	}
	}
	private convertToModel(formData:any): User{
		let newUser:User=new User();
		this.copyValues(formData, newUser);
		newUser.name=formData.lastName+' '+formData.firstName;
		newUser.password=formData.passwordGroup.password;
		newUser.mobile=formData.phone;
		
		let sec1=new SecurityQuestion();
		sec1.name=formData.securityQuestion1;
		sec1.answer=formData.securityAnswer1;
		let sec2=new SecurityQuestion();
		sec2.name=formData.securityQuestion2;
		sec2.answer=formData.securityAnswer2;
		newUser.securityQuestionList.push(sec1);
		newUser.securityQuestionList.push(sec2);
		return newUser;
	}

	private doAlert(titleStr:string, messageStr:string){
		this.dialogService.addDialog(AlertComponent, {
		      title:titleStr,
		      message:messageStr});
	}

}