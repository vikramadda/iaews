package org.iae.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Activity;
import org.iae.repository.ActivityRepository;
import org.iae.service.ActivityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService {

	private static final Logger logger = LoggerFactory.getLogger(ActivityService.class);
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Override
	public Activity addActivity(Activity activity) throws OperationFailedException {
		
		Activity updatedActivity;
		
		logger.debug("Entered into addActivity()");
		
		try {
			updatedActivity = activityRepository.save(activity);
		} catch(Exception e) {
			logger.debug("Exception adding activity : {}", e.getMessage());
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.debug("Exit from addActivity()");
		
		return updatedActivity;
	}

	@Override
	public void updateActivity(Activity activity) throws ObjectNotFoundException, OperationFailedException {
		
		logger.debug("Entered into updateActivity()");
		
		try {
			activityRepository.save(activity);
		} catch(Exception e) {
			logger.debug("Exception updating activity : {}", e.getMessage());
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.debug("Exit from updateActivity()");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Activity> getAllActivities() {
		logger.debug("Entered into getAllActivities()");
		
		List<Activity> activityList = (List<Activity>) activityRepository.findAll();
		
		setImages(activityList);
		
		logger.debug("Exit from getAllActivities()");
		
		return activityList;
	}

	@Override
	public List<Activity> getAllActivitiesByProject(String projectName) {
		logger.debug("Entered into getAllActivitiesByProject(), projectName : {} ", projectName);
		
		List<Activity> activityList = (List<Activity>) activityRepository.findAllByProject(projectName);
		
		setImages(activityList);
		
		logger.debug("Exit from getAllActivitiesByProject(), projectName : {} ", projectName);
		
		return activityList;
	}

	@Override
	public Activity getActivityByName(String activityName) {
		logger.debug("Entered into getActivityByName(), activityName : {} ", activityName);
		Activity activity = activityRepository.findByName(activityName);
		
		setImages(activity);
		
		return activity;
	}

	@Override
	public List<Activity> getAllActivitiesByStatus(String status) {
		logger.debug("Entered into getAllActivitiesByStatus(), status : {} ", status);
		List<Activity> activityList = (List<Activity>) activityRepository.findAllByStatus(status);
		setImages(activityList);
		logger.debug("Exit from getAllActivitiesByStatus(), status : {} ", status);
		return activityList;
	}
	
	private void setImages(List<Activity> activityList) {
		
		if(activityList != null && activityList.size() > 0) {
			for(Activity activity : activityList) {
				setImages(activity);
			}
		}
	}
	
	private void setImages(Activity activity) {

		if(activity != null) {
			List<String> imagesForActivity = new ArrayList<>();
			File dir = new File(activity.getImagesLoc());

			if(dir.exists() && dir.isDirectory()) {
				File[] files = dir.listFiles();
				for(File file : files) {
					imagesForActivity.add(file.getAbsolutePath() + File.separator + file.getName());
				}
				//Setting all images URLs to the activity
				activity.setImagesURL(imagesForActivity);
			}
		}
	}
}