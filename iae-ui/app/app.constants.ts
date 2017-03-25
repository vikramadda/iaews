export class AppConstants{
	//user registration
	public static LIST_ROLES:string = "http://localhost:8080/roles";
	public static LIST_SECURITY_QUESTIONS:string = "http://localhost:8080/securityquestions";
	public static ADD_USER:string = "http://localhost:8080/register";

	//Login
	public static LOGIN:string = "http://localhost:8080/login";
	public static GET_USER:string = "http://localhost:8080/user";

	//Activities
	public static ADD_ACTIVITY:string = "http://localhost:8080/activity/add";
	public static READ_ACTIVITY:string = "http://localhost:8080/activity/activityId/";
	public static UPDATE_ACTIVITY:string = "http://localhost:8080/activity/update";
	public static LIST_ACTIVITIES:string = "http://localhost:8080/activity/all";
	public static LIST_ACTIVITIES_UPCOMING:string = "http://localhost:8080/activity/status/Upcoming";
	public static LIST_ACTIVITIES_BY_PROJECT:string = "http://localhost:8080/activity/project/";

	//Projects
	public static ADD_PROJECT:string = "http://localhost:8080/project/add";
	public static UPDATE_PROJECT:string = "http://localhost:8080/project/update";
	public static LIST_PROJECTS:string = "http://localhost:8080/project/all";
}