package org.iae.util;

import java.util.ArrayList;
import java.util.List;

import org.iae.pojo.Role;

public class RolesEnum { 

	public static enum ENUMS {

		Admin (1, "Admin", "Administrator"),
		User (2, "User", "User"),
		Guest (3, "Guest", "Guest"),
		Volunteer (4, "Volunteer", "Volunteer"),
		Internship (5, "Internship", "Internship");

		private Integer id;
		private String name;
		private String description;

		private ENUMS(Integer id, String name, String description)
		{
			this.id = id;		
			this.name = name;
			this.description = description;
		}

		public Integer getId() {
			return id;
		}

		public String getName() {
			return name;
		}

		public String getDescription() {
			return description;
		}

		public static Role getByName(String name) {

			Role role = null;

			for(ENUMS e : values()) {
				if(e.name.equalsIgnoreCase(name)) {
					role = new Role();
					role.setId(Long.valueOf(e.id));
					role.setName(e.name);
					role.setDescription(e.description);
					break;
				}
			}
			return role;
		}

		public static List<Role> getAll() {

			List<Role> roleList = new ArrayList<>();

			for(ENUMS e : values()) {
				Role role = new Role();
				role.setId(Long.valueOf(e.id));
				role.setName(e.name);
				role.setDescription(e.description);
				roleList.add(role);
			}

			return roleList;
		}
	}
}
