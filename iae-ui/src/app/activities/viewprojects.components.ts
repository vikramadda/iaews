import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { ActivityService } from './activities.service';
import { Project } from './activities.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'view-projects',
  templateUrl :'viewprojects.html',
  styleUrls:['style.css'],
  providers:[ ActivityService ]
})
export class ViewProjectsComponent implements OnInit {

constructor(private activityService: ActivityService, private sanitizer:DomSanitizer){}

	pageTitle: string = 'List of Projects';
	projects : Project[] = [];
	errorMessage: string;

	ngOnInit():void {
		this.loadingDBDefaults();
	}
	loadingDBDefaults():void {
		this.activityService.listAllProjects().subscribe(projects => this.projects=projects);
	}
	sanitize(url:string){
    		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
}
