export class User {
	public id:number=0;
	public name:string='';
	public password:string='';
	public mobile:string='';
	public email:string='';
	public role:string='';
	public securityQuestionList:SecurityQuestion[]=[];
}

export class SecurityQuestion {
	public id:number=0;
	public name:string='';
	public hint:string='';
	public answer:string='';
}

export class Role {
	public id:number;
	public name:string='';
	public description:string='';
}