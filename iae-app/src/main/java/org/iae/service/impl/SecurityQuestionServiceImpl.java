package org.iae.service.impl;

import java.util.List;

import org.iae.pojo.SecurityQuestion;
import org.iae.repository.SecurityQuestionsRepository;
import org.iae.service.SecurityQuestionService;
import org.springframework.beans.factory.annotation.Autowired;

public class SecurityQuestionServiceImpl implements SecurityQuestionService {

	@Autowired
	private SecurityQuestionsRepository securityQuestionsRepository;
	
	@Override
	public List<SecurityQuestion> getAllSecurityQuestions() {
		return (List<SecurityQuestion>) securityQuestionsRepository.findAll();
	}
	
}
