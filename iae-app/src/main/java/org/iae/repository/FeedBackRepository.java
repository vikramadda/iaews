package org.iae.repository;

import java.util.List;

import org.iae.pojo.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepository extends CrudRepository<Feedback, Long> {

	Page<Feedback> findAll();

	List<Feedback> findAllByActivity(String activityName);
}
