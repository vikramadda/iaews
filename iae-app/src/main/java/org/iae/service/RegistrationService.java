package org.iae.service;

import org.iae.exception.ObjectAlreadyExistException;
import org.iae.pojo.User;

public interface RegistrationService {

	public User registerUser(User user) throws ObjectAlreadyExistException;
}
