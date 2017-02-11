package org.iae.controller;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.pojo.User;
import org.iae.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(path="/users/{roleName}", method=RequestMethod.GET)
	public ResponseEntity<Object> getAllUsersByRoleName(@PathVariable String roleName) {
		
		List<User> userList = null;
		
		if(roleName == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Role name should not be null");
		}
		
		try {
			userList = userService.getUsersByRole(roleName);
		} catch(ObjectNotFoundException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("No Role Found with roleName " + roleName);

		}
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body(userList);
	}

	@RequestMapping(path="/user/{userName}", method=RequestMethod.GET)
	public ResponseEntity<Object> getUsersByUserName(@PathVariable String userName) {
		
		User user = null;
		
		if(userName == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("User name should not be null");
		}
		
		try {
			user = userService.getUser(userName);
		} catch(ObjectNotFoundException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("No User Found with userName " + userName);

		}
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body(user);
	}
}
