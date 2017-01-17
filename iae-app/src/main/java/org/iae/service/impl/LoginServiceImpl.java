package org.iae.service.impl;

import org.iae.service.LoginService;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

	@Override
	public boolean authenticate(String userName, String password) {
		
		return false;
	}

	@Override
	public boolean resetPassword(String userName, String newPassword) {

		return false;
	}
}
