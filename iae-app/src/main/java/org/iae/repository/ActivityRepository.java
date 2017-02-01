package org.iae.repository;

import org.iae.pojo.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

	Page<Activity> findAll();
	
	Activity findByName(String name);
	
	Page<Activity> findAllByStatus(String status);
	
	Page<Activity> findAllByProjectId(Long project);
	
	Page<Activity> findAllByProject(String projectName);
}
