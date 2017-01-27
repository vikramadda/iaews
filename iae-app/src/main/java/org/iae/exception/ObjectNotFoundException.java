package org.iae.exception;

public class ObjectNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	private String message = null;
	
	@Override
	public String getMessage() {
		return message;
	}

	public ObjectNotFoundException(String message) {
		this.message = message;
	}
}