export class Project {
	id:number = 0;
	name:string = '';
	description:string = '';
	creationDate:string = '';
	endDate:string = '';
	status:string = '';
	logoLocWithName:string ='';
}
export class Activity {
	id:number = 0;
	name:string = '';
	description:string = '';
	startDate:string = '';
	endDate:string = '';
	actBudget:string = '';
	estBudget:string = '';
	status:string = '';
	logoLocWithName:string = '';
	projectId:string ='';
}