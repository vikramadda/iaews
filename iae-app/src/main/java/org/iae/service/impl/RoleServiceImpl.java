package org.iae.service.impl;

import java.util.List;

import org.iae.pojo.Role;
import org.iae.service.RoleService;
import org.iae.util.RolesEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

	private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

/*	@Autowired
	private RoleRepository roleRepository;
*/	
	@Override
	public List<Role> getAllRoles() {

		logger.debug("Entered into getAllRoles() method");
		
		//Get all the roles from ENUM
		return RolesEnum.ENUMS.getAll();

		//Get all the roles from DB
		//return (List<Role>) roleRepository.findAll();
	}

	@Override
	public Role getByName(String roleName) {
		
		logger.debug("Entered into getByName() method for {} ", roleName);

		//Get the role from ENUM
		return RolesEnum.ENUMS.getByName(roleName);
		//Get the role from DB
		//return roleRepository.findByNameIgnoringCase(name);
	}
	
	public Role getById(Integer id) {
		
		logger.debug("Entered into getById() method for {} ", id);
		
		return RolesEnum.ENUMS.getById(id);
		
		//Get the role from DB
		//return roleRepository.findOne(id);
	}
}