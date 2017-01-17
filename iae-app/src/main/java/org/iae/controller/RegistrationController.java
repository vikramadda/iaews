package org.iae.controller;

import org.iae.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

	@Autowired
	RegistrationService registrationService;
	
	@RequestMapping("/register")
    public String register() {
    	
		//User Validation

/*		
		User inputUser = new User();
		
    	User savedUser = registrationService.registerUser(inputUser);
    	
    	if(savedUser != null) {
    		return "Registration Successful";
    	} else {
    		return "Registration Failed";
    	}
*/    
    	return "Registration Page";
    	
    }
}
