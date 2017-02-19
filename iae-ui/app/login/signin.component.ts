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
import { Location } from '@angular/common';
import {LocalStorageService} from 'ng2-webstorage';

@Component({
  moduleId: module.id,
  selector: 'user-signin',
  templateUrl : 'signin.html',
  styleUrls:['style.css'],
  providers:[LoginService]
})

export class SigninComponent implements OnInit {
	private pageTitle:string = 'Sign In!';
	private signinForm:FormGroup;

	constructor ( private fb: FormBuilder,
			  private loginservice:LoginService,
			  private router: Router,
			  private dialogService:DialogService,
			  private location: Location,
			  private storage:LocalStorageService
			){}

	ngOnInit() : void {
		this.signinForm=this.fb.group({
			userName: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	signin(): void {
		console.log('Form data'+JSON.stringify(this.signinForm.value));
		let newUser:User=new User();
		newUser.name=this.signinForm.value.userName;
		newUser.password= this.signinForm.value.password;
		this.loginservice.login(newUser).subscribe(
			message => this.getUser(newUser.name),
			error => this.doAlert("Error!",error)
			);
	}
	private getUser(userName:string) : void {
		this.loginservice.getUser(userName).subscribe(
			user => this.cacheUser(user),
			error => this.doAlert("Error!",error)
		);
	}

	private doAlert(titleStr:string, messageStr:string){
		this.dialogService.addDialog(AlertComponent, {
		      title:titleStr,
		      message:messageStr});
	}

	private cacheUser(user:User):void{
		let user1:User = new User();
		user1.name=user.name;
		user1.role=user.role;
		this.storage.store('currentUser', user1);
		this.router.navigate(['home']); 
	}
	
}
