package org.iae.controller;

import org.iae.exception.AuthenticationException;
import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Role;
import org.iae.pojo.User;
import org.iae.service.LoginService;
import org.iae.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private RoleService roleService;
	
    @RequestMapping(path="/login", method=RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user) {
    	
    	logger.debug("Entered into login()");
    	
    	if(user == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Invalid User Data");
    	}
    	
    	String userName = user.getName();
    	String password = user.getPassword();
    
    	if(userName == null || password == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Username or Password Null");
    	}
    	
    	User existedUser = null;
    	
		try {
			existedUser = loginService.authenticate(userName, password);
		} catch (ObjectNotFoundException e)  {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("User Not Found : " + userName);
		} catch (AuthenticationException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Authentication Failure : " + e.getMessage());
		}
    	
		if(existedUser != null) {
			logger.info("User Authentication Successful for user {} ", userName);

			Role role = roleService.getById(existedUser.getRole());

			String roleName = role.getName();

			switch(roleName) {
				case "Admin": break;
				case "User" : break;
				case "Guest" : break;
				case "Volunteer" : break;
				case "Internship" :	break;
			}

			return ResponseEntity
					.status(HttpStatus.OK)
					.body("Authentication Successful");
		} else {
    		logger.info("User Authentication Failed for user {} ", userName);
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Authentication Failed");
    	}
    }

    @RequestMapping(path="/reset", method=RequestMethod.PUT)
    public ResponseEntity<String> resetPassword(@RequestParam("username") String userName, @RequestParam("password") String oldPassword, @RequestParam("newpassword") String newPassword) {
    	
    	logger.debug("Entered into resetPassword()");
    	
    	if(userName == null || oldPassword == null || newPassword == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Username or Password Null");
    	}
    	
    	boolean isResetSuccessful = false;
    	
		try {
			isResetSuccessful = loginService.resetPassword(userName, oldPassword, newPassword);
		} catch (ObjectNotFoundException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("User Not Found : " + userName);
			
		} catch (OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Password Reset Failure : " + e.getMessage());
		}
    	
    	if(isResetSuccessful) {
    		logger.info("Password Reset Successfor user {} ", userName);
			return ResponseEntity
		            .status(HttpStatus.OK)
		            .body("Password Reset Success");
    	} else {
    		logger.info("Password Reset Failed for user {} ", userName);
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Password Reset Failed");
    	}
    }
}