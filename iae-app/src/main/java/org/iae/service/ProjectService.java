package org.iae.service;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Project;

public interface ProjectService {

	public Project addProject(Project project) throws OperationFailedException;
	
	public void updateProject(Project project) throws ObjectNotFoundException, OperationFailedException;
	
	public List<Project> getAllProjects();
	
	public Project getProjectByName(String name);
	
	public List<Project> getAllProjectsByStatus(String status);

}
