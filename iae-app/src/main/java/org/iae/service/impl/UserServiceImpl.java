package org.iae.service.impl;

import java.util.List;

import org.iae.exception.ObjectAlreadyExistException;
import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Role;
import org.iae.pojo.User;
import org.iae.repository.UserRepository;
import org.iae.service.RoleService;
import org.iae.service.UserService;
import org.iae.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> getUsersByRole(String roleName) throws ObjectNotFoundException {

		List<User> userList = null;

		logger.debug("Entered into getUsersByRole(), roleName : {} ", roleName);

		Role role = roleService.getByName(roleName);
		
		if(role != null) {
			userList = userRepository.findByRole(role.getId());
		} else {
			throw new ObjectNotFoundException("No Role found with rolename : "+ roleName);
		}
		
		logger.debug("Exit from getUsersByRole() method");
		
		return userList;
	}
	
	@Override
	public User getUser(String userName) throws ObjectNotFoundException {
		
		logger.debug("Entered into getUser(), username : {} ", userName.toLowerCase());
		
		User user = userRepository.findByNameAllIgnoringCase(userName);
		
		logger.debug("Exit from getUser() method");
		
		return user;
	}

	public User getUser(Long userID) throws ObjectNotFoundException {

		logger.debug("Entered into getUser(), userID : {} ", userID);
		
		User user = userRepository.findOne(userID);
		
		logger.debug("Exit from getUser() method");
		
		return user;
	}
	
	@Override
	public User addUser(User user) throws ObjectAlreadyExistException {
		
		logger.debug("Entered into addUser() method, username : {} ", user.getName());

		User savedUser = null;
		
		//Setting the hashed password to user to store in DB
		user.setPassword(SecurityUtil.generateHash(user.getPassword()));

		try {
			//Save the user and returns savedUser with ID
			savedUser = userRepository.save(user);
		} catch(Exception e) {
			throw new ObjectAlreadyExistException(e.getMessage());
		}

		logger.debug("Exit from addUser() method");
		
		return savedUser;
	}

	@Override
	public User updateUser(User user) throws OperationFailedException {
		
		logger.debug("Entered into updateUser() method, username : {} ", user.getName());

		User updatedUser = null;

		try {
			//Save the user and returns savedUser with ID
			updatedUser = userRepository.save(user);
		} catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}

		logger.debug("Exit from updateUser() method");
		
		return updatedUser;
	}
	
	@Override
	public void deleteUser(User user) throws OperationFailedException {

		logger.debug("Entered into deleteUser() method, username : {} ", user.getName());

		try {
			//Delete the user
			userRepository.delete(user);
		} catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}

		logger.debug("Exit from deleteUser() method");
	}

	@Override
	public void deleteUser(Long userID) throws OperationFailedException {

		logger.debug("Entered into deleteUser() method, userID : {} ", userID);

		try {
			//Delete the user
			userRepository.delete(userID);
		} catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}

		logger.debug("Exit from deleteUser() method");
	}
}
