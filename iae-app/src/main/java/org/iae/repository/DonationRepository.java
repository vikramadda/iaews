package org.iae.repository;

import java.util.Date;
import java.util.List;

import org.iae.pojo.Donation;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends CrudRepository<Donation, Long> {

	Page<Donation> findAll();

	List<Donation> findByDonationDate(Date date);
}
