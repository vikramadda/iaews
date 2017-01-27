package org.iae.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SecurityUtil {

	private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);
	
	public static String generateHash(String input) {

		logger.debug("Entered into generateHash() method");

		String hashedInput = "";

		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] hashedBytes = md.digest(input.getBytes());
			hashedInput = new String(hashedBytes);
		} catch(NoSuchAlgorithmException se) {
			logger.error("Failed to generate hash for the input. Exception {} ", se);
		}

		logger.debug("Exit from generateHash() method");

		return hashedInput;
	}
}