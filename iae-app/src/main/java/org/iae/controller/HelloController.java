package org.iae.controller;

import org.iae.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
	@Autowired
	RoleRepository roleRepository;
	
    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }
    
}
