package org.iae.controller;

import java.util.Date;
import java.util.List;

import org.iae.exception.OperationFailedException;
import org.iae.pojo.Donation;
import org.iae.service.DonationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DonationController {

	private static final Logger logger = LoggerFactory.getLogger(DonationController.class);
	
	@Autowired
	private DonationService donationService;
	
	@RequestMapping(path="donations/add", method=RequestMethod.POST)
	public ResponseEntity<String> addDonation(@RequestBody Donation donation) {

		logger.debug("Entered into addDonation()");
		
		if(donation == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Insufficient Donation details");
		}
		
		try {
			donationService.addDonation(donation);	
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to add donation details " + e.getMessage());
		}

		logger.debug("Exit from addDonation()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Donation added successfully");
	}

	@RequestMapping(path="donations/add", method=RequestMethod.POST)
	public ResponseEntity<String> addDonations(List<Donation> donations) {

		logger.debug("Entered into addDonations()");
		
		if(donations == null) {
			return ResponseEntity
		            .status(HttpStatus.EXPECTATION_FAILED)
		            .body("Insufficient Donation details");
		}
		
		try {
			donationService.addDonations(donations);	
		} catch(OperationFailedException e) {
			return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body("Unable to add donation details " + e.getMessage());
		}

		logger.debug("Exit from addDonations()");
		
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Donation added successfully");
	}
	
	@RequestMapping(path="donations", method=RequestMethod.GET)
	public List<Donation> getAllDonations() {
		
		logger.debug("Entered into getAllDonations()");

		return donationService.getAllDonations();
	}
	
	@RequestMapping(path="donations/{date}", method=RequestMethod.GET)
	public List<Donation> getDonationsByDate(@PathVariable Date date) {
		
		logger.debug("Entered into getDonationsByDate(), Date : {} ", date);

		return donationService.getDonationsByDate(date);
	}
}
