package org.iae.controller;

import java.util.List;

import org.iae.pojo.SecurityQuestion;
import org.iae.service.SecurityQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityQuestionController {

	@Autowired
	private SecurityQuestionService securityQuestionService;
	
    @RequestMapping(path="/securityquestions", method=RequestMethod.GET)
    public List<SecurityQuestion> getAllSecurityQuestions() {
    	return securityQuestionService.getAllSecurityQuestions();
    }
}