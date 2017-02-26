export class Project {
	id:string = '';
	name:string = '';
	description:string = '';
	creationDate:string = '';
	endDate:string = '';
	logoLocWithName:string = '';
	status:string = '';
}
export class Activity {
	id:string = '';
	name:string = '';
	description:string = '';
	startDate:string = '';
	endDate:string = '';
	actBudget:string = '';
	estBudget:string = '';
	status:string = '';
	logo:string = '';
	imagesLoc:string = '';
	project:Project = new Project();
}