package org.iae.service;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Activity;

public interface ActivityService {

	public Activity addActivity(Activity activity) throws OperationFailedException;
	
	public void updateActivity(Activity activity) throws ObjectNotFoundException, OperationFailedException;
	
	public List<Activity> getAllActivities();
	
	public List<Activity> getAllActivitiesByProject(String projectName);
	
	public List<Activity> getAllActivitiesByStatus(String status);

	Activity getActivityById(Long activityId);
	
}
