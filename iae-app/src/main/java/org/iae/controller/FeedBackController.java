package org.iae.controller;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Feedback;
import org.iae.service.FeedBackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/feedback")
public class FeedBackController {

	private static final Logger logger = LoggerFactory.getLogger(FeedBackController.class);
	
	@Autowired
	private FeedBackService feedBackService;

    @RequestMapping(path="/add", method=RequestMethod.POST)
	public ResponseEntity<Object> addFeedback(Feedback feedback) {
		
		logger.debug("Entered into addFeedback()");

		Feedback udpatedFeedback = null;
		
		if(feedback == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid Data, Feedback details are expected");
		}
		
		try {
			udpatedFeedback = feedBackService.saveFeedBack(feedback);
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to add Feedback due to " + e.getMessage());
		}
		
		logger.debug("Exit from addFeedback()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body(udpatedFeedback);
	}

    @RequestMapping(path="/update", method=RequestMethod.PUT)
	public ResponseEntity<String> updateFeedback(Feedback feedback) {
		
		logger.debug("Entered into updateFeedback()");

		if(feedback == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid Data, Feedback details are expected");
		}
		
		try {
			feedBackService.updateFeedBack(feedback);
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to update Feedback due to " + e.getMessage());
		} catch(ObjectNotFoundException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Feedback not found to update. Feedback");
		}
		
		logger.debug("Exit from updateFeedback()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Update Feedback successful");
	}

	
    @RequestMapping(path="/all", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllFeedBacks() {

    	logger.debug("Entered into getAllFeedbacks()");

    	List<Feedback> feedBacks = feedBackService.getAllFeedBack();

    	logger.debug("Exit from getAllFeedbacks()");

    	if(feedBacks != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(feedBacks);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No Feedback available");	
    	}
    }
    
    @RequestMapping(path="/{activityName}", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllFeedbackByActivityName(@PathVariable String activityName) {

    	logger.debug("Entered into getAllFeedbackByActivityName()");

    	if(activityName == null) {
    		return ResponseEntity
    				.status(HttpStatus.EXPECTATION_FAILED)
    				.body("Expected activity name");
    	}
    	
    	List<Feedback> feedBacks = feedBackService.getAllByActivity(activityName);

    	logger.debug("Exit from getAllFeedbackByActivityName()");

    	if(feedBacks != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(feedBacks);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No Feedbacks available for activity : " + activityName);	
    	}
    }
}