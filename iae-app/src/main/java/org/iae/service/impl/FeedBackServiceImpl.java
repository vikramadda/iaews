package org.iae.service.impl;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Feedback;
import org.iae.repository.FeedBackRepository;
import org.iae.service.FeedBackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedBackServiceImpl implements FeedBackService {

	private static final Logger logger = LoggerFactory.getLogger(FeedBackService.class);
	
	@Autowired
	private FeedBackRepository feedBackRepository;
	
	@Override
	public Feedback saveFeedBack(Feedback feedBack) throws OperationFailedException {
		
		Feedback updatedFeedBack = null;
		
		logger.debug("Entered into saveFeedBack()");
		
		try {
			updatedFeedBack = feedBackRepository.save(feedBack);
		} catch(Exception e) {
			logger.error("Exception saveFeedBack {} ", e.getMessage());
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.debug("Exit from saveFeedBack()");
		
		return updatedFeedBack;
	}

	@Override
	public void updateFeedBack(Feedback feedBack) throws ObjectNotFoundException, OperationFailedException {
		logger.debug("Entered into saveFeedBack()");
		
		try {
			feedBackRepository.save(feedBack);
		} catch(Exception e) {
			logger.error("Exception update FeedBack {} ", e.getMessage());
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.debug("Exit from saveFeedBack()");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Feedback> getAllFeedBack() {
		logger.debug("Entered into getAllFeedBack()");
		return (List<Feedback>) feedBackRepository.findAll();
	}

	@Override
	public List<Feedback> getAllByActivity(String activityName) {
		logger.debug("Entered into getAllByActivity()");
		return feedBackRepository.findAllByActivity(activityName);
	}
}