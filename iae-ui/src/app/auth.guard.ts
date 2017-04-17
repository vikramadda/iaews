import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorageService} from 'ng2-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private storage:LocalStorageService) {}

  canActivate() {
  	let currentUser = this.storage.retrieve('currentUser');
  	if(currentUser && currentUser.role == 1)
      	return true;

    // If not, they redirect them to the login page
    this.router.navigate(['signin']);
    return false;
  }
}