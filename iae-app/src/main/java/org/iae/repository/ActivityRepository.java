package org.iae.repository;

import java.util.Date;
import java.util.List;

import org.iae.pojo.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

	List<Activity> findAll();
	
	List<Activity> findAllByStatus(String status);
	
	List<Activity> findAllByProjectId(Long projectId);
	
	List<Activity> findAllByStartDateBetween(Date previousDate, Date currentDate);
	
	List<Activity> findAllByStartDateAfter(Date currentDate);
}
