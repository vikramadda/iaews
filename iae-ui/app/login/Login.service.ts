import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { User, SecurityQuestion, Role } from './login.model';
import { AppConstants } from '../app.constants';


@Injectable()
export class LoginService {

	addUserUrl :string ='http://localhost:3004/posts';
	updateUserUrl :string ='http://localhost:3004/posts';
	verifyUserUrl : string ='http://localhost:3004/posts';

	private headers = new Headers({'Content-Type': 'application/json'});
    	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http){}

	listRoles(): Observable<Role[]> {
		return this.http.get(AppConstants.LIST_ROLES)
	            .map(response => response.json() )
	            .do(data => console.log("Roles List",data))
	            .catch(this.handleError);
    	}

    	listSecurityQuestions(): Observable<SecurityQuestion[]> {
		return this.http.get(AppConstants.LIST_SECURITY_QUESTIONS)
	            .map(response => response.json() )
	            .do(data => console.log("Security Questions List",data))
	            .catch(this.handleError);
    	}

    	saveUser(user: User):Observable<string> {
        return this.http.post(AppConstants.ADD_USER, user, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    	}

    	login(user: User):Observable<string> {
        return this.http.post(AppConstants.LOGIN, user, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    	}

    	getUser(userName:string): Observable<User> {
    		const url = `${AppConstants.GET_USER}/${userName}`; 
	    	return this.http.get(url)
	    	  	.map(response => response.json())
	            .do(data => console.log('status ' + JSON.stringify(data)))
	            .catch(this.handleError);
    	}

  	private handleError(error: any): Observable<any> {
    		console.error('Krishna An error occurred', error); // for demo purposes only
    		return Observable.throw(error._body || 'Server error');
  	}

}
