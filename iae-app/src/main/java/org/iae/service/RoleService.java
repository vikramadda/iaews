package org.iae.service;

import java.util.List;

import org.iae.pojo.Role;

public interface RoleService {

	public List<Role> getAllRoles();

	public Role getByName(String name);
}
