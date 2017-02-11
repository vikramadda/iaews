package org.iae.service;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Feedback;

public interface FeedBackService {

	public Feedback saveFeedBack(Feedback feedBack) throws OperationFailedException;
	
	public void updateFeedBack(Feedback feedBack) throws ObjectNotFoundException, OperationFailedException;
	
	public List<Feedback> getAllFeedBack();
	
	public List<Feedback> getAllByActivity(String activityName);
	
}
