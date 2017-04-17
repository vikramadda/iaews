import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericValidator } from '../utils/generic-validator';
import { MyValidators } from '../utils/field-validators';
import { DialogService } from '../dialog/dialog.service';
import { AlertComponent } from '../dialog/alert.component';
import { ActivityService } from './activities.service';
import { Project, Activity } from './activities.model';


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
	private file_src: string; 
	private activityLogo:File;
	
	constructor(private fb: FormBuilder, 
		private router: Router,
		private route:ActivatedRoute,
		private  activityService:ActivityService,
		private dialogService:DialogService,
		private changeDetectorRef: ChangeDetectorRef) {
		
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
			projectId:{
			                required: 'project is required.'
			            }
        	};
        	this.genericValidator = new GenericValidator(this.validationMessages);
	}
	
	fileChange(input:any) {  
        	// Start reading this file  
            this.readFile(input, new FileReader(), (result:any) => {  
                // Create an img element and add the image file data to it  
                var img = document.createElement("img");  
                img.src = result;  
                // Send this img to the resize function (and wait for callback)  
                this.resize(img, 250, 250, (resized_jpeg:any) => {  
                    this.file_src = resized_jpeg;  
                });  
            });
    	} 

    	readFile(file:any, reader:any, callback:any) {  
		reader.onload = () => {  
			callback(reader.result);  
			// console.log(reader.result);  
		}  
        	reader.readAsDataURL(file);  
        	this.activityLogo=file;
    	}  
 
    	resize(img:any, MAX_WIDTH: number, MAX_HEIGHT: number, callback:any) {  
      	// This will wait until the img is loaded before calling this function  
      	return img.onload = () => {  
	            // Get the images current width and height  
	            var width = img.width;  
	            var height = img.height;  
	            // Set the WxH to fit the Max values (but maintain proportions)  
	            if (width > height) {  
	                if (width > MAX_WIDTH) {  
	                    height *= MAX_WIDTH / width;  
	                    width = MAX_WIDTH;  
	                }  
	            } else {  
	                if (height > MAX_HEIGHT) {  
	                    width *= MAX_HEIGHT / height;  
	                    height = MAX_HEIGHT;  
	                }  
	            }  
	            // create a canvas object  
	            var canvas = document.createElement("canvas");  
	            // Set the canvas to the new calculated dimensions  
	            canvas.width = width;  
	            canvas.height = height;  
	            var ctx = canvas.getContext("2d");  
	            ctx.drawImage(img, 0, 0, width, height);  
	            // Get this encoded as a jpeg  
	            // IMPORTANT: 'jpeg' NOT 'jpg'  
	            var dataUrl = canvas.toDataURL('image/jpeg');  
	            // callback with the results  
	            callback(dataUrl, img.src.length, dataUrl.length);  
        	};  
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
			id:0,
			name:['', [Validators.required]],
			description:['', [Validators.required]],
			startDate:['', [Validators.required]],
			endDate:['', [Validators.required]],
			actBudget:['', [Validators.required]],
			estBudget:['', [Validators.required]],
			status:['', [Validators.required]],
			projectId:['', [Validators.required]],
			logoLocWithName:''
		});

		// Read the activity Id from the route parameter
	      this.sub = this.route.params.subscribe(
	            params => {
	                let id = params['id'];
	                console.log("id=",id);
	                if(id == 'new'){
	               	this.resetForm();
	                }else{
	                	this.activityService.readActivity(id).subscribe(activity => this.setForm(activity));
	                }
	            }
	      );
	}
	
	add(): void {
		console.log("Activity Logo",this.activityLogo);
		let newActivity:Activity=this.convertToModel(this.activityForm.value);
		console.log('Activity',JSON.stringify(newActivity));
		if(newActivity.id ==0){
			this.activityService.saveActivity(newActivity,this.activityLogo).subscribe(
			message => this.doAlert("Success!","Activity Added Successfully"),
			error => this.doAlert("Error!",error)
			);
		}else{
			this.activityService.updateActivity(newActivity,this.activityLogo).subscribe(
			message => this.doAlert("Success!","Activity Updated Successfully"),
			error => this.doAlert("Error!",error)
			);
		}
		
	}

	resetForm(): void {
		this.activityForm.setValue({
			id:0,
			name:'',
			description:'',
			startDate:'',
			endDate:'',
			actBudget:'',
			estBudget:'',
			status:'',
			logoLocWithName:'',
			projectId:''
		});		
	}
	setForm(activity:Activity): void {
		this.activityForm.setValue({
			id:activity.id,
			name:activity.name,
			description:activity.description,
			startDate:activity.startDate,
			endDate:activity.endDate,
			actBudget:activity.actBudget,
			estBudget:activity.estBudget,
			status:activity.status,
			projectId:activity.projectId,
			logoLocWithName:activity.logoLocWithName
		});
	}

    	onSaveComplete(): void {
        	this.resetForm();
        	this.router.navigate(['/activities']);
    	}
	
	loadingDBDefaults():void {
		this.activityService.listAllProjects().subscribe(projects => this.projects=projects);
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
