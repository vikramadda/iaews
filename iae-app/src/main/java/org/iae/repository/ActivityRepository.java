package org.iae.repository;

import java.util.List;

import org.iae.pojo.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

	List<Activity> findAll();
	
	Activity findByName(String name);
	
	List<Activity> findAllByStatus(String status);
	
	List<Activity> findAllByProjectId(Long project);
	
	List<Activity> findAllByProject(String projectName);
}
