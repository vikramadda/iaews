import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './activities.service';
import { Activity } from './activities.model';

@Component({
  moduleId: module.id,
  selector: 'view-activities',
  templateUrl :'viewactivities.html',
  styleUrls:['style.css'],
  providers:[ ActivityService ]
})
export class ViewActivitiesComponent implements OnInit {

constructor(private activityService: ActivityService, private route:ActivatedRoute){}

	pageTitle: string = 'List of Activities';
	activities : Activity[] = [];
	errorMessage: string;
	sub:Subscription;
	ngOnInit():void {
		  this.sub = this.route.params.subscribe(
	            params => {
	                let id = params['id'];
	                if(id === 'all'){
	               	this.activityService.listAllActivities().subscribe(activities => this.activities = activities,
                           error => this.errorMessage = <any>error);  
	                }else{
	                	this.activityService.listActivitiesByProject(id).subscribe(activities => this.activities = activities,
                           error => this.errorMessage = <any>error); 
	                }
	            }
	      );	  
	}
}
