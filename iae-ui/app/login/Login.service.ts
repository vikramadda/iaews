import { Injectable } from '@angular/core';
import { User } from './login.model';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

	addUserUrl :string ='http://localhost:3004/posts';
	updateUserUrl :string ='http://localhost:3004/posts';
	verifyUserUrl : string ='http://localhost:3004/posts';

	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http){}

	addUser( user:User ) : Promise<User> {
		console.log("adding new user");
		return this.http
			    .post(this.addUserUrl, JSON.stringify(user), {headers: this.headers})
			    .toPromise()
			    .then(res => res.json().data as User)
			    .catch(this.handleError);
	}

	updateUser( user:User) :Promise<User> {
		console.log("updating user");
		return this.http
			    .put(this.updateUserUrl, JSON.stringify(user), {headers: this.headers})
			    .toPromise()
			    .then(() => user)
			    .catch(this.handleError);
	}

	verifyUser( user:User) : Promise<User> {
		console.log("verifying user",user);
		return this.http
			    .post(this.verifyUserUrl, JSON.stringify(user), {headers: this.headers})
			    .toPromise()
			    .then(response => response.json().data as User)
			    .catch(this.handleError);
		
	}

	private handleError(error: any): Promise<any> {
    		console.error('Krishna An error occurred', error); // for demo purposes only
    		return Promise.reject(error.message || error);
  	}

}
