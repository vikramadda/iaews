package org.iae.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Activity;
import org.iae.service.ActivityService;
import org.iae.util.IAEContants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/activity")
public class ActivityController {

	private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);
	
	@Autowired
	private ActivityService activityService;

    @RequestMapping(path="/add", method=RequestMethod.POST)
	public ResponseEntity<Object> addActivity(@RequestBody Activity activity/*, HttpServletRequest request*/) {
		
		logger.debug("Entered into addActivity()");

		Activity udpatedActivity = null;
		
		if(activity == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid Data, activity details are expected");
		}
		
		try {

			//setImagesToActivity(activity, request);

			udpatedActivity = activityService.addActivity(activity);
			
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to add activity due to " + e.getMessage());
		}
		
		logger.debug("Exit from addActivity()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body(udpatedActivity);
	}

    @RequestMapping(path="/update", method=RequestMethod.POST)
	public ResponseEntity<String> updateActivity(@RequestBody Activity activity/*, HttpServletRequest request*/) {
		
		logger.debug("Entered into updateActivity()");

		if(activity == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid Data, activity details are expected");
		}
		
		try {
			
			//setImagesToActivity(activity, request);
			
			activityService.updateActivity(activity);
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to update activity due to " + e.getMessage());
		} catch(ObjectNotFoundException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("activity not found to update. Acitvity name : " + activity.getName());
		}
		
		logger.debug("Exit from updateActivity()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Update Activity successful");
	}

    @RequestMapping(path="/all", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllActivities() {

    	logger.debug("Entered into getAllActivities()");

    	List<Activity> activities = activityService.getAllActivities();

    	logger.debug("Exit from getAllActivities()");

    	if(activities != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activities);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No activities available");	
    	}
    }

    @RequestMapping(path="/id/{activityId}", method=RequestMethod.GET)
    public ResponseEntity<Object> getActivityById(@PathVariable Long activityId) {

    	logger.debug("Entered into getActivityById(), Activity Id : ", activityId);

    	Activity activities = activityService.getActivityById(activityId);

    	logger.debug("Exit from getActivityById(), Activity Id : ", activityId);

    	if(activities != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activities);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No activity available by Id : " + activityId);	
    	}
    }

    @RequestMapping(path="/status/{status}", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllActivitiesByStatus(@PathVariable String status) {

    	logger.debug("Entered into getAllActivitiesByStatus(), status {} ", status);

    	if(status == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected status");
    	}

    	List<Activity> activities = activityService.getAllActivitiesByStatus(status);

    	logger.debug("Exit from getAllActivitiesByStatus()");

    	if(activities != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activities);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No activities found with status " + status);
    	}
    }

    @RequestMapping(path="/activityId/{activityId}", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllActivitiesByName(@PathVariable String activityId) {

    	logger.debug("Entered into getActivitiesByName(), name {} ", activityId);

    	if(activityId == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected activity name");
    	}
    	
    	Activity activity = activityService.getActivityById(Long.parseLong(activityId));

    	logger.debug("Exit from getActivitiesByName()");

    	if(activity != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activity);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No activity found with " + activityId);
    	}
    }

    @RequestMapping(path="/project/{projectName}", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllActivitiesByProject(@PathVariable String projectName) {

    	logger.debug("Entered into getAllActivitiesByProject(), name {} ", projectName);

    	if(projectName == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected project name");
    	}
    	
    	List<Activity> activities = activityService.getAllActivitiesByProject(projectName);

    	logger.debug("Exit from getAllActivitiesByProject()");

    	if(activities != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activities);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No activites found for the project " + projectName);
    	}
    }

    @RequestMapping(path="/recent", method=RequestMethod.GET)
    public ResponseEntity<Object> getRecentActivities() {

    	logger.debug("Entered into getRecentActivities()");

    	List<Activity> activities = activityService.getAllRecentActivities();

    	logger.debug("Exit from getRecentActivities()");

    	if(activities != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activities);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No Recent activites found");
    	}
    }

    @RequestMapping(path="/upcoming", method=RequestMethod.GET)
    public ResponseEntity<Object> getUpcomingActivities() {

    	logger.debug("Entered into getUpcomingActivities()");

    	List<Activity> activities = activityService.getAllUpcomingActivities();

    	logger.debug("Exit from getUpcomingActivities()");

    	if(activities != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(activities);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No upcoming activites found");
    	}
    }

    private void setImagesToActivity(Activity activity, HttpServletRequest request) {
    	
		String[] fileNamesArray = request.getParameterMap().get(IAEContants.PARAM_FILE_NAMES);
		
		if(fileNamesArray != null) {
			List<String> fileNames = Arrays.asList();	
			for(String fileName : fileNames) {
				if(fileName.equalsIgnoreCase(activity.getLogo())) {
					activity.setLogo(request.getParameter(IAEContants.PARAM_FILE_PATH) + File.separator + fileName);
				}
			}
			activity.setImagesLoc(request.getParameter(IAEContants.PARAM_FILE_PATH));
		}

    }
}