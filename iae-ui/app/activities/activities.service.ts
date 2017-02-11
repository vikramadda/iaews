import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Activity } from './activities.model';

@Injectable()
export class ActivityService {

	private addActivityUrl :string ='http://localhost:3004/activities';
    private readActivityUrl :string ='http://localhost:3004/activities';
    private listActivitiesURL :string ='http://localhost:3004/activities';

	private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http){}

	listActivities(): Observable<Activity[]> {
        return this.http.get(this.listActivitiesURL)
            .map(this.extractData )
            .do(data => console.log('listActivities: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    readActivity(activityId:string): Observable<Activity> {
        const url = `${this.readActivityUrl}/${activityId}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('readActivity: ' + JSON.stringify(data)))
            .catch(this.handleError);    }

    saveActivity(product: Activity): Observable<Activity> {
        return this.http.post(this.addActivityUrl, product, this.options)
            .map(this.extractData)
            .do(data => console.log('save product: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

	private handleError(error: Response): Observable<any> {
    		console.error('Krishna An error occurred', error); // for demo purposes only
    		console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  	}

    private extractData(response: Response) {
        let body = response.json();
        console.log(body);
        return body;
       // return body.data || {};
    }
}
