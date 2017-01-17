package org.iae.service.impl;

import java.util.List;

import org.iae.pojo.Role;
import org.iae.service.RoleService;
import org.iae.util.RolesEnum;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

/*	@Autowired
	private RoleRepository roleRepository;
*/	
	@Override
	public List<Role> getAllRoles() {

		//Get all the roles from ENUM
		return RolesEnum.ENUMS.getAll();

		//Get all the roles from DB
		//return (List<Role>) roleRepository.findAll();
	}

	@Override
	public Role getByName(String name) {
		
		//Get the role from ENUM
		return RolesEnum.ENUMS.getByName(name);
		//Get the role from DB
		//return roleRepository.findByNameIgnoringCase(name);
	}
}
