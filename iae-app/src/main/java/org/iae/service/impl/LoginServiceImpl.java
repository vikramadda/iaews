package org.iae.service.impl;

import org.iae.exception.AuthenticationException;
import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.User;
import org.iae.service.LoginService;
import org.iae.service.UserService;
import org.iae.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

	private static final Logger logger = LoggerFactory.getLogger(LoginService.class);
	
	@Autowired
	private UserService userService;
	
	@Override
	public User authenticate(String userName, String password) throws ObjectNotFoundException, AuthenticationException {
	
		logger.debug("Entered into authenticate() for {} ", userName.toLowerCase());
		
		boolean isAuthenticated = false;
		
		User user = userService.getUser(userName);
		
		if(user != null) {
			String hashedPassword = SecurityUtil.generateHash(password); 
			if(user.getPassword().equals(hashedPassword)) {
				isAuthenticated = true;
			} else {
				throw new AuthenticationException("Authentication Failed : " + userName);
			}
		} else {
			throw new ObjectNotFoundException("User Not Found : " + userName);
		}
		
		logger.debug("Exit from authenticate() method");
		
		if(isAuthenticated) {
			return user;
		}
		
		return null;
	}

	@Override
	public boolean resetPassword(String userName, String oldPassword, String newPassword) throws ObjectNotFoundException, OperationFailedException {

		logger.debug("Entered into resetUser() method for {} ", userName.toLowerCase());

		boolean isResetted = false;

		User user = userService.getUser(userName);

		try {
			if(user != null) {
				if(user.getPassword().equals(SecurityUtil.generateHash(oldPassword))) {
					user.setPassword(SecurityUtil.generateHash(newPassword));
					userService.updateUser(user);
					isResetted = true;
				} else {
					throw new OperationFailedException("Given password is not match : " + userName);
				}
			} else {
				throw new ObjectNotFoundException("User Not Found : " + userName);
			}
		} catch(Exception e) {
			throw new OperationFailedException("ResetPassword Failure :" + e.getMessage());
		}
		logger.debug("Exit from resetUser() method");

		return isResetted;
	}
}