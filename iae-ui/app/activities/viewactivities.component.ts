import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';
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

constructor(private activityService: ActivityService){}

	pageTitle: string = 'Activities';
	activities : Activity[] = [];
	errorMessage: string;

	ngOnInit():void {
		this.activityService.listActivities().subscribe(activities => this.activities = activities,
                           error => this.errorMessage = <any>error);        
	}
}
