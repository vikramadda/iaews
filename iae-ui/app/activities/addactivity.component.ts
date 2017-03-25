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
import { Activity,Project } from './activities.model';


@Component({
  moduleId: module.id,
  selector: 'add-activity',
  templateUrl :'addactivity.html',
  styleUrls:['style.css'],
  providers :[ ActivityService ]
})
export class AddActivityComponent implements OnInit, AfterViewInit {
	@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
	pageTitle:string = 'Add Activity';
    	displayMessage: { [key: string]: string } = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;
	activityForm: FormGroup;
	activity:Activity;
	errorMessage:string;
	sub:Subscription;
	statuses:String[]=["Upcoming","Started","Completed"];
	projects:Project[];
	
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
			startDate:{
			                required: 'startDate is required.'
			            },
			endDate:{
			                required: 'endDate is required.'
			            },
			actBudget:{
			                required: 'Actual budget is required.'
			            },
			estBudget:{
			                required: 'estimated budget is required.'
			            },
			status:{
			                required: 'status is required.'
			            },
			logo:{
			               required: 'logo is required.'
			            },
			imagesLoc:{
			                required: 'image location is required.'
			            },
			project:{
			                required: 'project is required.'
			            }
        	};
        	this.genericValidator = new GenericValidator(this.validationMessages);
	}
	
  	ngAfterViewInit(): void {
       	let controlBlurs: Observable<any>[] = this.formInputElements
            	.map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
      	Observable.merge(this.activityForm.valueChanges, ...controlBlurs).debounceTime(800)
      		.subscribe(value => {
            		this.displayMessage = this.genericValidator.processMessages(this.activityForm);
        		});
    	}

	ngOnInit(): void {
		this.loadingDBDefaults();
		this.activityForm = this.fb.group({
			name:['', [Validators.required]],
			description:['', [Validators.required]],
			startDate:['', [Validators.required]],
			endDate:['', [Validators.required]],
			actBudget:['', [Validators.required]],
			estBudget:['', [Validators.required]],
			status:['', [Validators.required]],
			logo:['', [Validators.required]],
			imagesLoc:['', [Validators.required]],
			project:[, [Validators.required]]
		});

		// Read the activity Id from the route parameter
	      this.sub = this.route.params.subscribe(
	            params => {
	                let id = params['id'];
	                if(id === 'new'){
	               	this.resetForm();
	                }else{
	                	this.activityService.readActivity(id).subscribe(activity => this.setForm(activity));
	                }
	            }
	      );
	}
	
	add(): void {
		console.log("Projects JSON",this.projects);
		let newActivity:Activity=this.convertToModel(this.activityForm.value);
		newActivity.project=JSON.parse(this.activityForm.value.project);
		console.log('Activity',JSON.stringify(newActivity));
		if(newActivity.id ==null){
			this.activityService.saveActivity(newActivity).subscribe(
			message => this.doAlert("Success!","Activity Added Successfully"),
			error => this.doAlert("Error!",error)
			);
		}else{
			this.activityService.updateActivity(newActivity).subscribe(
			message => this.doAlert("Success!","Activity Added Successfully"),
			error => this.doAlert("Error!",error)
			);
		}
		
	}

	/*read(activityId:string): void {
		this.activityService.readActivity(activityId)
				.subscribe((activity: Activity) => this.onProductRetrieved(activity),
                (error: any) => this.errorMessage = <any>error);
	}*/

	onProductRetrieved(activity: Activity): void {
       	console.log("activity read is ",activity);
       	this.setForm(activity);
       	console.log("activity form :",this.activityForm.value);
    	}

	resetForm(): void {
		this.activityForm.setValue({
			name:'',
			description:'',
			startDate:'',
			endDate:'',
			actBudget:'',
			estBudget:'',
			status:'',
			logo:'',
			imagesLoc:'',
			project:null
		});		
	}
	setForm(activity:Activity): void {
			console.log("form data set");	
		this.activityForm.setValue({
			//id:activity.id,
			name:activity.name,
			description:activity.description,
			startDate:activity.startDate,
			endDate:activity.endDate,
			actBudget:activity.actBudget,
			estBudget:activity.estBudget,
			status:activity.status,
			logo:activity.logo,
			imagesLoc:activity.imagesLoc,
			project:activity.project
		});

	}

    	onSaveComplete(): void {
        	this.resetForm();
        	this.router.navigate(['/activities']);
    	}
	
	loadingDBDefaults():void {
		this.activityService.listProjects().subscribe(projects => this.projects=projects);
		//this.loginservice.listSecurityQuestions().subscribe(securityQuestions => this.securityQuestionsList=securityQuestions);
	}

	private copyValues(srcObj:any, destObj:any):void {
	  	for (var key in destObj) {
	    		if(destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key))
	      		destObj[key] = srcObj[key];
	  	}
	}
	private convertToModel(formData:any): Activity{
		let newActivity:Activity=new Activity();
		this.copyValues(formData, newActivity);
		return newActivity;
	}
    	private doAlert(titleStr:string, messageStr:string){
		this.dialogService.addDialog(AlertComponent, {
		      title:titleStr,
		      message:messageStr});
	}

}
