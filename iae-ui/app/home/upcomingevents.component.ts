import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../activities/activities.service';
import { Activity} from '../activities/activities.model';

@Component({
  moduleId: module.id,
  selector: 'upcomingevents',
  styleUrls:['style.css'],
  templateUrl : 'upcomingevents.html',
  providers:[ ActivityService ]
})
export class UpComingEventsComponent implements OnInit {
	private showType:string;
	activities : Activity[] = [];
	errorMessage: string;
	constructor(private route:ActivatedRoute, private activityService:ActivityService){}
	ngOnInit():void{
		this.loadingDBDefaults();
	      this.route.params.subscribe(
	            params => {
	                this.showType = params['type'];
	                console.log("type ::",this.showType);
	            }
	      );
	}

	loadingDBDefaults():void {
		this.activityService.listUpcomingActivities().subscribe(activities => this.activities = activities,
                           error => this.errorMessage = <any>error);  
	}
}
