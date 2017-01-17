package org.iae.service.impl;

import org.iae.pojo.User;
import org.iae.service.RegistrationService;
import org.springframework.stereotype.Service;

@Service
public class RegistrationServiceImpl implements RegistrationService {

/*	@Autowired
	private UserRepository userRepository;
*/	
	@Override
	public User registerUser(User user) {
		User savedUser = null;
		//savedUser = userRepository.save(user);
		return savedUser;
	}
	
}
