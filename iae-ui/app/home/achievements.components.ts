import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'achievements',
  styleUrls:['style.css'],
  templateUrl : 'achievements.html'
})
export class AchievementsComponent implements OnInit {
	private showType:string;
	constructor(private route:ActivatedRoute){}
	ngOnInit():void{
	      this.route.params.subscribe(
	            params => {
	                this.showType = params['type'];
	                console.log("type ::",this.showType);
	            }
	      );
	}
}
