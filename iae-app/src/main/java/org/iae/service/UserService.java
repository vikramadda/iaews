package org.iae.service;

import java.util.List;

import org.iae.exception.ObjectAlreadyExistException;
import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.User;

public interface UserService {

	public List<User> getUsersByRole(String role) throws ObjectNotFoundException;
	
	public User getUser(String userName) throws ObjectNotFoundException;
	
	public User getUser(Long userID) throws ObjectNotFoundException;
	
	public User addUser(User user) throws ObjectAlreadyExistException;

	public User updateUser(User user) throws OperationFailedException;
	
	public void deleteUser(User user) throws OperationFailedException;
	
	public void deleteUser(Long userID) throws OperationFailedException;
}
