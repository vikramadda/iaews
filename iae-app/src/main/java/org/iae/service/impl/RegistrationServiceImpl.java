package org.iae.service.impl;

import org.iae.exception.ObjectAlreadyExistException;
import org.iae.pojo.User;
import org.iae.repository.UserRepository;
import org.iae.service.RegistrationService;
import org.iae.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationServiceImpl implements RegistrationService {

	private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User registerUser(User user) throws ObjectAlreadyExistException {

		logger.debug("Entered into registerUser() method");
		
		User savedUser = null;
		
		//Setting the hashed password to user to store in DB
		user.setPassword(SecurityUtil.generateHash(user.getPassword()));

		try {
			//Save the user and returns savedUser with ID
			savedUser = userRepository.save(user);
		} catch(Exception e) {
			throw new ObjectAlreadyExistException(e.getMessage());
		}

		logger.debug("Exit from registerUser() method");

		return savedUser;
	}
}