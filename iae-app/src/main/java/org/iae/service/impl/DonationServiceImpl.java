package org.iae.service.impl;

import java.util.Date;
import java.util.List;

import org.iae.exception.OperationFailedException;
import org.iae.pojo.Donation;
import org.iae.repository.DonationRepository;
import org.iae.service.DonationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class DonationServiceImpl implements DonationService {

	private static final Logger logger = LoggerFactory.getLogger(DonationService.class);
	
	@Autowired
	private DonationRepository donationRepository;
	
	@Override
	public Donation addDonation(Donation donation) throws OperationFailedException {
		
		logger.debug("Entered into addDonation() method");
		
		donation = donationRepository.save(donation);
		
		logger.debug("Exit from addDonation() method");
		
		return donation;
	}

	@Override
	public void addDonations(List<Donation> donations) throws OperationFailedException {
		
		logger.debug("Entered into addDonation() method");
		
		donationRepository.save(donations);
		
		logger.debug("Entered into addDonation() method");
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Donation> getAllDonations() {
		
		List<Donation> donationList = null;
		
		logger.debug("Entered into getAllDonations() method");
		
		donationList = (List<Donation>) donationRepository.findAll();
		
		logger.debug("Entered into getAllDonations() method");
		
		return donationList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Donation> getDonationsByDate(Date date) {
	
		List<Donation> donationList = null;
		
		logger.debug("Entered into getDonationsByDate() method");
		
		donationList = (List<Donation>) donationRepository.findByDonationDate(date);
		
		logger.debug("Entered into getDonationsByDate() method");
		
		return donationList;
	}
	
}
