package org.iae.controller;

import org.iae.exception.ObjectAlreadyExistException;
import org.iae.pojo.User;
import org.iae.service.RegistrationService;
import org.iae.util.ValidationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

	private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);

	@Autowired
	RegistrationService registrationService;
	
	@RequestMapping(path="/register", method=RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody User user) {
    	
		logger.debug("Entered into register() method");
		
		User savedUser = null;
		
		//Check if user is null
		if(user == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid User Data");
		}

		try {
			//Check validations. If success, proceed with registration 
			if(ValidationUtil.validateRegistrationUser(user)) {
				savedUser = registrationService.registerUser(user);
			} else {
				return ResponseEntity
						.status(HttpStatus.EXPECTATION_FAILED)
						.body("Invalid User Data");
			}
		} catch(ObjectAlreadyExistException e) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("User Already Exist : " + user.getName());
		}
		
    	if(savedUser != null) {
			return ResponseEntity
		            .status(HttpStatus.OK)
		            .body("Registration Successful");
    	} else {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Registration Failed, Try again");
    	}
    }
}