package org.iae.controller;

import java.util.ArrayList;
import java.util.List;

import org.iae.pojo.SecurityQuestion;
import org.iae.pojo.User;
import org.iae.util.SpringBeanUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @RequestMapping("/")
    public String index() {
    	
    	return "Greetings from Spring Boot!";
    }

    @RequestMapping("/reg")
    public ResponseEntity<String> registerTest() {
    	RegistrationController rc = SpringBeanUtil.getBean(RegistrationController.class);
    	User user = new User();
    	//user.setId(1L);
    	user.setName("RAJRAm");
    	user.setPassword("abc");
    	user.setConfirmPassword("abc");
    	user.setRole(1);
    	user.setEmail("a@b.c");
    	user.setMobile("1223");

    	List<SecurityQuestion> sqList = new ArrayList<>();
    	
    	for(int i =0; i < 2; i++) {
    		
    		SecurityQuestion sq = new SecurityQuestion();
    		sq.setId(1L);
    		sq.setAnswer("abc");
    		sq.setHint("pq");
    		sqList.add(sq);
    	}
    	
    	user.setSecurityQuestionList(sqList);
    	
    	return rc.register(user);
    }

    @RequestMapping("/log")
    public ResponseEntity<String> loginTest() {
    	LoginController lc = SpringBeanUtil.getBean(LoginController.class);
    	User user = new User();
    	user.setName("VIKRAm");
    	user.setPassword("abc");

    	return lc.login(user);
    }
    
    @RequestMapping("/res")
    public ResponseEntity<String> resetTest() {
    	LoginController lc = SpringBeanUtil.getBean(LoginController.class);
    	return lc.resetPassword("Vikram", "abc", "xyz");
    }
}