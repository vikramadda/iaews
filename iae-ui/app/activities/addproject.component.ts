import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { GenericValidator } from '../utils/generic-validator';
import { MyValidators } from '../utils/field-validators';
import { DialogService } from '../dialog/dialog.service';
import { AlertComponent } from '../dialog/alert.component';

import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivityService } from './activities.service';
import { Project } from './activities.model';


@Component({
  moduleId: module.id,
  selector: 'add-project',
  templateUrl :'addproject.html',
  styleUrls:['style.css'],
  providers :[ ActivityService ]
})
export class AddProjectComponent implements OnInit, AfterViewInit {
	@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
	pageTitle:string = 'Add Project';
    	displayMessage: { [key: string]: string } = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;
	projectForm: FormGroup;
	project:Project;
	errorMessage:string;
	sub:Subscription;
	statuses:String[]=["Upcoming","Started","Completed"];
	
	constructor(private fb: FormBuilder, 
		private router: Router,
		private route:ActivatedRoute,
		private  activityService:ActivityService,
		private dialogService:DialogService) {
		
		this.validationMessages = {
	            name: {
	                required: 'Activity name is required.'
	            },
			description:{
			               required: 'description is required.'
			            },
			creationDate:{
			                required: 'startDate is required.'
			            },
			endDate:{
			                required: 'endDate is required.'
			            },
			status:{
			                required: 'status is required.'
			            },
			logoLocWithName:{
			               required: 'logo is required.'
			            }
			
        	};
        	this.genericValidator = new GenericValidator(this.validationMessages);
	}
	
  	ngAfterViewInit(): void {
       	let controlBlurs: Observable<any>[] = this.formInputElements
            	.map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
      	Observable.merge(this.projectForm.valueChanges, ...controlBlurs).debounceTime(800)
      		.subscribe(value => {
            		this.displayMessage = this.genericValidator.processMessages(this.projectForm);
        		});
    	}

	ngOnInit(): void {
		this.projectForm = this.fb.group({
			id:'',
			name:['', [Validators.required]],
			description:['', [Validators.required]],
			creationDate:['', [Validators.required]],
			endDate:['', [Validators.required]],
			status:['', [Validators.required]],
			logoLocWithName:['', [Validators.required]]
		});

		// Read the project Id from the route parameter
	      this.sub = this.route.params.subscribe(
	            params => {
	                let id = params['id'];
	                console.log("id=",id);
	                if(id == 'new'){
	               	this.resetForm();
	                }else{
	                	this.activityService.readProject(id).subscribe(project => this.setForm(project));
	                }
	            }
	      );
	}
	
	add(): void {
		console.log('Form data'+JSON.stringify(this.projectForm.value));
		let newproject:Project=this.convertToModel(this.projectForm.value);
		console.log('project',JSON.stringify(newproject));
		if(newproject.id ==''){
			this.activityService.saveProject(newproject).subscribe(
			message => this.doAlert("Success!","Project Added Successfully"),
			error => this.doAlert("Error!",error)
			);
		}else{
			this.activityService.updateProject(newproject).subscribe(
			message => this.doAlert("Success!","Project Updated Successfully"),
			error => this.doAlert("Error!",error)
			);
		}
	}

	resetForm(): void {
		this.projectForm.setValue({
			id:'',
			name:'',
			description:'',
			creationDate:'',
			endDate:'',
			status:'',
			logoLocWithName:'',
		});		
	}
	setForm(project:Project): void {
		this.projectForm.setValue({
			id:project.id,
			name:project.name,
			description:project.description,
			creationDate:project.creationDate,
			endDate:project.endDate,
			status:project.status,
			logoLocWithName:project.logoLocWithName
		});		
	}

    	onSaveComplete(): void {
        	this.resetForm();
        	this.router.navigate(['/projects']);
    	}
	
	private copyValues(srcObj:any, destObj:any):void {
	  	for (var key in destObj) {
	    		if(destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key))
	      		destObj[key] = srcObj[key];
	  	}
	}
	private convertToModel(formData:any): Project{
		let newproject:Project=new Project();
		this.copyValues(formData, newproject);
		return newproject;
	}
    	private doAlert(titleStr:string, messageStr:string){
		this.dialogService.addDialog(AlertComponent, {
		      title:titleStr,
		      message:messageStr});
	}

}
