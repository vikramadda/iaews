package org.iae.repository;

import org.iae.pojo.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepository extends CrudRepository<Feedback, Long> {

	Page<Feedback> findAll();

	Page<Feedback> findAllByActivity(String activityName);
}
