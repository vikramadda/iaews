package org.iae.controller;

import java.util.List;

import org.iae.pojo.Role;
import org.iae.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
    @RequestMapping(path="/getAll", method=RequestMethod.GET)
    public List<Role> getAllRoles() {
    	return roleService.getAllRoles();
    }

    @RequestMapping(path="/{roleName}", method=RequestMethod.GET)
    public Role getByName(@PathVariable String roleName) {
    	return roleService.getByName(roleName);
    }
}
