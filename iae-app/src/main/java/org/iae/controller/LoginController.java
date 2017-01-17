package org.iae.controller;

import org.iae.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

	@Autowired
	LoginService loginService;
	
    @RequestMapping("/login")
    public String login() {
    	
    	String userName = "";
    	String password = "";
    	
    	if(userName == null || password == null) {
    		//Throw exception
    	}
    	
/*    	boolean isAuthenticated = loginService.authenticate(userName, password);
    	
    	if(isAuthenticated) {
    		return "Authenticated";
    	} else {
    		return "Authentication Failed";
    	}
*/  
    	return "Login Page";
    }
}
