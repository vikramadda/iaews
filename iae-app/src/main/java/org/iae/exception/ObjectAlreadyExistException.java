package org.iae.exception;

public class ObjectAlreadyExistException extends Exception {

	private static final long serialVersionUID = 1L;

	private String message = null;
	
	@Override
	public String getMessage() {
		return message;
	}

	public ObjectAlreadyExistException(String message) {
		this.message = message;
	}
}