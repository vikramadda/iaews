package org.iae.service;

public interface LoginService {

	public boolean authenticate(String userName, String password);
	
	public boolean resetPassword(String userName, String newPassword);
}
