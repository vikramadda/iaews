import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericValidator } from '../utils/generic-validator';

import { ActivityService } from './activities.service';
import { Activity } from './activities.model';


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
	addActivityForm: FormGroup;
	activity:Activity;
	errorMessage:string;
	sub:Subscription;

	projects:Array<String>=["project1","project2","project3"];
	
	constructor(private fb: FormBuilder, 
		private router: Router,
		private route:ActivatedRoute,
		private  activityService:ActivityService) {
		
		this.validationMessages = {
	            activityName: {
	                required: 'Activity name is required.',
	                minlength: 'Activity name is too short.'
	            },
	            project: {
	                required: 'Project is required.'
	            },
	            description: {
	                required: 'Description is required',
	                minlength: 'Description is too short.'
	            }
        	};
        	this.genericValidator = new GenericValidator(this.validationMessages);
	}
	
  	ngAfterViewInit(): void {
       	let controlBlurs: Observable<any>[] = this.formInputElements
            	.map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
      	Observable.merge(this.addActivityForm.valueChanges, ...controlBlurs).debounceTime(800)
      		.subscribe(value => {
            		this.displayMessage = this.genericValidator.processMessages(this.addActivityForm);
        		});
    	}

	ngOnInit(): void {
		this.addActivityForm = this.fb.group({
			activityId:'',
			activityName:['', [Validators.required, Validators.minLength(3)]],
			project:['',Validators.required],
			description:['', [Validators.required, Validators.minLength(10)]],
			startDate:'',
			endDate:''
		});

		// Read the activity Id from the route parameter
	      this.sub = this.route.params.subscribe(
	            params => {
	                let id = params['id'];
	                if(id === 'new'){
	               	this.resetForm();
	                }else{
	                	this.read(id);
	                }
	            }
	      );
	}
	
	add(): void {
		if (this.addActivityForm.dirty && this.addActivityForm.valid) {
	            let p = Object.assign({}, this.activity, this.addActivityForm.value);
	            p.id=this.addActivityForm.value.activityName;
	            console.log("saving activity",JSON.stringify(p));
			this.activityService.saveActivity(p)
				.subscribe(
	 			() => this.onSaveComplete(),
	                  (error: any) => this.errorMessage = <any>error
			);
		}
	}

	read(activityId:string): void {
		this.activityService.readActivity(activityId)
				.subscribe((activity: Activity) => this.onProductRetrieved(activity),
                (error: any) => this.errorMessage = <any>error);
	}

	onProductRetrieved(activity: Activity): void {
       	console.log("activity read is ",activity);
       	this.setForm(activity);
       	console.log("activity form :",this.addActivityForm.value);
    	}

	resetForm(): void {
		this.addActivityForm.setValue({
			activityId:'',
			activityName:'',
			project:'',
			description:'',
			startDate:'',
			endDate:''
		});		
	}
	setForm(activity:Activity): void {
		this.addActivityForm.setValue({
			activityId:activity.activityName,
			activityName:activity.activityName,
			project:activity.project,
			description:activity.description,
			startDate:activity.startDate,
			endDate:activity.endDate
		});		
	}

    	onSaveComplete(): void {
        	this.resetForm();
        	this.router.navigate(['/activities']);
    	}

}
