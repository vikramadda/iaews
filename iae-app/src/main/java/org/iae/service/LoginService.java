package org.iae.service;

import org.iae.exception.AuthenticationException;
import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.User;

public interface LoginService {

	public User authenticate(String userName, String password) throws ObjectNotFoundException, AuthenticationException ;
	
	public boolean resetPassword(String userName, String oldPassword, String newPassword) throws ObjectNotFoundException, OperationFailedException ;
}
