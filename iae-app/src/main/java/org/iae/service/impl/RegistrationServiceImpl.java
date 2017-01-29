package org.iae.service.impl;

import org.iae.exception.ObjectAlreadyExistException;
import org.iae.pojo.User;
import org.iae.service.RegistrationService;
import org.iae.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationServiceImpl implements RegistrationService {

	private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);
	
	@Autowired
	private UserService userService;
	
	@Override
	public User registerUser(User user) throws ObjectAlreadyExistException {

		logger.debug("Entered into registerUser() method");
		
		User savedUser = userService.addUser(user);

		logger.debug("Exit from registerUser() method");

		return savedUser;
	}
}