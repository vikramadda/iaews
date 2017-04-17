import { Component, OnInit } from '@angular/core';
import { User } from '../login/login.model';
import { Router } from '@angular/router';
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl :'header.html',
  styleUrls:['style.css']
})
export class HeaderComponent{

	@LocalStorage('currentUser')
    	currentUser: User;
 
    	constructor(private router: Router, private storage:LocalStorageService) {}
    
	logout():void {
		this.storage.clear('currentUser');
		this.router.navigate(['home']); 
	}
}
