package org.iae.exception;

public class AuthenticationException extends Exception {

	private static final long serialVersionUID = 1L;

	private String message = null;
	
	@Override
	public String getMessage() {
		return message;
	}

	public AuthenticationException(String message) {
		this.message = message;
	}
}
