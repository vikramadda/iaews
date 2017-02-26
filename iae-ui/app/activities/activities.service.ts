import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { AppConstants } from '../app.constants';
import { Activity,Project } from './activities.model';

@Injectable()
export class ActivityService {

	private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){}

	listActivities(): Observable<Activity[]> {
        return this.http.get(AppConstants.LIST_ACTIVITIES)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    /*readActivity(activityId:string): Observable<Activity> {
        const url = `${AppConstants.LIST_ACTIVITIES}/${activityId}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('readActivity: ' + JSON.stringify(data)))
            .catch(this.handleError);    }*/


    saveActivity(activity: Activity):Observable<string> {
        return this.http.post(AppConstants.ADD_ACTIVITY, activity, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProject(project: Project):Observable<string> {
        return this.http.post(AppConstants.ADD_PROJECT, project, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    listProjects():Observable<Project[]> {
        return this.http.get(AppConstants.LIST_PROJECTS, this.options)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
            console.error('Krishna An error occurred', error); // for demo purposes only
            return Observable.throw(error._body || 'Server error');
      }

}
