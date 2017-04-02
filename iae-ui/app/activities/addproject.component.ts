import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
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
	private file_src: string; 
	private projectLogo:File;
	
	constructor(private fb: FormBuilder, 
		private router: Router,
		private route:ActivatedRoute,
		private  activityService:ActivityService,
		private dialogService:DialogService,
		private changeDetectorRef: ChangeDetectorRef) {
		
		this.validationMessages = {
	            name: {
	                required: 'Project Name is required.'
	            },
			description:{
			               required: 'Description is required.'
			            },
			creationDate:{
			                required: 'Start Date is required.'
			            },
			endDate:{
			                required: 'End Date is required.'
			            },
			status:{
			                required: 'Status is required.'
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
        	this.projectLogo=file;
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
      	Observable.merge(this.projectForm.valueChanges, ...controlBlurs).debounceTime(800)
      		.subscribe(value => {
            		this.displayMessage = this.genericValidator.processMessages(this.projectForm);
        		});
    	}

	ngOnInit(): void {
		this.projectForm = this.fb.group({
			id:0,
			name:['', [Validators.required]],
			description:['', [Validators.required]],
			creationDate:['', [Validators.required]],
			endDate:['', [Validators.required]],
			status:['', [Validators.required]],
			logoLocWithName:''
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
		console.log("Project Logo",this.projectLogo);
		let newproject:Project=this.convertToModel(this.projectForm.value);
		console.log('New Project',newproject);
		if(newproject.id ==0){
			this.activityService.saveProject(newproject,this.projectLogo).subscribe(
			message => this.doAlert("Success!","Project Added Successfully"),
			error => this.doAlert("Error!",error)
			);
		}else{
			this.activityService.updateProject(newproject,this.projectLogo).subscribe(
			message => this.doAlert("Success!","Project Updated Successfully"),
			error => this.doAlert("Error!",error)
			);
		}
	}

	resetForm(): void {
		this.projectForm.setValue({
			id:0,
			name:'',
			description:'',
			creationDate:'',
			endDate:'',
			status:'',
			logoLocWithName:''
		});	
		this.file_src=undefined;	
		this.projectLogo=undefined;
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