package org.iae.service.impl;

import java.util.List;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Project;
import org.iae.repository.ProjectRepository;
import org.iae.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {

	private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Override
	public Project addProject(Project project) throws OperationFailedException {
		
		Project updatedProject = null;
		
		logger.debug("Entered into addProject() method");
		
		try {
			updatedProject = projectRepository.save(project);
		} catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.debug("Exit from addProject() method");
		
		return updatedProject;
	}

	@Override
	public void updateProject(Project project) throws ObjectNotFoundException, OperationFailedException {
		
		logger.debug("Entered into addProject() method");
		
		try {
			projectRepository.save(project);
		} catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}

		logger.debug("Exit from addProject() method");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Project> getAllProjects() {
		logger.debug("Entered into getAllProjects() method");
		return (List<Project>) projectRepository.findAll();
	}

	@Override
	public Project getProjectByName(String name) {
		logger.debug("Entered into getProjectByName() method");
		return projectRepository.findByName(name);
	}

	@Override
	public List<Project> getAllProjectsByStatus(String status) {
		logger.debug("Entered into getAllProjectsByStatus() method");
		return projectRepository.findAllByStatus(status);
	}
}