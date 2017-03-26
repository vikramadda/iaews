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

	listAllActivities(): Observable<Activity[]> {
        return this.http.get(AppConstants.LIST_ACTIVITIES)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    listAllProjects():Observable<Project[]> {
        return this.http.get(AppConstants.LIST_PROJECTS)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    listUpcomingActivities(): Observable<Activity[]> {
        return this.http.get(AppConstants.LIST_ACTIVITIES_UPCOMING)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    listActivitiesByProject(projectName:string): Observable<Activity[]> {
        return this.http.get(AppConstants.LIST_ACTIVITIES_BY_PROJECT+projectName)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    readActivity(activityId:string): Observable<Activity> {
        return this.http.get(AppConstants.READ_ACTIVITY+activityId)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveActivity(activity: Activity):Observable<string> {
        return this.http.post(AppConstants.ADD_ACTIVITY, activity, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateActivity(activity: Activity):Observable<string> {
        return this.http.post(AppConstants.UPDATE_ACTIVITY, activity, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    readProject(projectId:string): Observable<Project> {
        return this.http.get(AppConstants.READ_PROJECT+projectId)
            .map(response => response.json() )
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProject(project: Project):Observable<string> {
        return this.http.post(AppConstants.ADD_PROJECT, project, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateProject(project: Project):Observable<string> {
        return this.http.post(AppConstants.UPDATE_PROJECT, project, this.options)
            .do(data => console.log('status ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
            console.error('Krishna An error occurred', error); // for demo purposes only
            return Observable.throw(error._body || 'Server error');
      }

}
