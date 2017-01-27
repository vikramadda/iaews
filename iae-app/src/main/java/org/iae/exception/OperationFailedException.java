package org.iae.exception;

public class OperationFailedException extends Exception {

	private static final long serialVersionUID = 1L;

	private String message = null;
	
	@Override
	public String getMessage() {
		return message;
	}

	public OperationFailedException(String message) {
		this.message = message;
	}
}
