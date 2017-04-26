export class AppConstants{
	//user registration
	public static LIST_ROLES:string = "http://localhost:8080/iae-services/roles";
	public static LIST_SECURITY_QUESTIONS:string = "http://localhost:8080/iae-services/securityquestions";
	public static ADD_USER:string = "http://localhost:8080/iae-services/register";

	//Login
	public static LOGIN:string = "http://localhost:8080/iae-services/login";
	public static GET_USER:string = "http://localhost:8080/iae-services/user";

	//Activities
	public static ADD_ACTIVITY:string = "http://localhost:8080/iae-services/activity/add";
	public static READ_ACTIVITY:string = "http://localhost:8080/iae-services/activity/activityId/";
	public static UPDATE_ACTIVITY:string = "http://localhost:8080/iae-services/activity/update";
	public static LIST_ACTIVITIES:string = "http://localhost:8080/iae-services/activity/all";
	public static LIST_ACTIVITIES_UPCOMING:string = "http://localhost:8080/iae-services/activity/status/Upcoming";
	public static LIST_ACTIVITIES_BY_PROJECT:string = "http://localhost:8080/iae-services/activity/project/";

	//Projects
	public static ADD_PROJECT:string = "http://localhost:8080/iae-services/project/add";
	public static READ_PROJECT:string = "http://localhost:8080/iae-services/project/projectId/";
	public static UPDATE_PROJECT:string = "http://localhost:8080/iae-services/project/update";
	public static LIST_PROJECTS:string = "http://localhost:8080/iae-services/project/all";
}