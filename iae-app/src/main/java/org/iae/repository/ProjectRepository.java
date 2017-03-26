package org.iae.repository;

import java.util.List;

import org.iae.pojo.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository  extends CrudRepository<Project, Long> {

	List<Project> findAll();
	
	List<Project> findAllByStatus(String status);
	
}
