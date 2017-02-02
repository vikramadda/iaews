import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'add-activity',
  templateUrl :'addactivity.html',
  styleUrls:['style.css']
})
export class AddActivityComponent implements OnInit {
	constructor(private fb: FormBuilder, private router: Router) { }
	
	addActivityForm: FormGroup;

	projects:Array<String>=["project1","project2","project3"];
	
	activityNameMessage:string;
	projectMessage:string;
	activityDescrMessage:string;

	private validationMessages = {
	      required	: 	'You can\'t leave this empty.',
        	pattern	: 	'Please enter a valid value.',
        	match		:	'Confirmation value not matched.',
        	minlength	:	'value is too short in length.',
        	maxlength	:	'value is too high in length.'
	};

	ngOnInit(): void {
		this.addActivityForm = this.fb.group({
			activityName:['', [Validators.required, Validators.minLength(3)]],
			project:['',Validators.required],
			activityDescr:['', [Validators.required, Validators.minLength(10)]]
		});

		const activityNameControl= this.addActivityForm.get('activityName');
		activityNameControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("activityName", activityNameControl));
	
		const projectControl= this.addActivityForm.get('project');
		projectControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("project", projectControl));
	
		const activityDescrControl= this.addActivityForm.get('activityDescr');
		activityDescrControl.valueChanges.debounceTime(500).subscribe(value => this.setMessage("activityDescr", activityDescrControl));
	}

	resetForm(): void {
		this.addActivityForm.setValue({
			activityName:'',
			project:'',
			activityDescr:''
		});		
	}
	
	add(): void {
		console.log('activity data'+JSON.stringify(this.addActivityForm.value));
	}

    	setMessage(message:string, c:AbstractControl): void {
    		let message1:string;
    		if ((c.touched || c.dirty) && c.errors) {
    			console.log("touched");
	            message1 = Object.keys(c.errors).map(key =>
	                this.validationMessages[key]).join(' ');
	        }

	        if(message == "activityName"){
	        	this.activityNameMessage=message1;
	        }else if(message == "project"){
	        	this.projectMessage=message1;
	        }else if(message == "activityDescr"){
	        	this.activityDescrMessage=message1;
	        }
    	}


}
