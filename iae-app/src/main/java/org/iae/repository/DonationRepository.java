package org.iae.repository;

import java.util.Date;

import org.iae.pojo.Donation;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends CrudRepository<Donation, Long> {

	Page<Donation> findAll();

	Page<Donation> findByDonationDate(Date date);
}
