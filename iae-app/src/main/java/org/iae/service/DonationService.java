package org.iae.service;

import java.util.Date;
import java.util.List;

import org.iae.exception.OperationFailedException;
import org.iae.pojo.Donation;

public interface DonationService {
	
	public Donation addDonation(Donation donation) throws OperationFailedException;

	public void addDonations(List<Donation> donations) throws OperationFailedException;
	
	public List<Donation> getAllDonations();
	
	public List<Donation> getDonationsByDate(Date date);
}
