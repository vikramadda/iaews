package org.iae.service;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Document;

public interface DocumentService {

	public Document uploadDocument(Document document) throws OperationFailedException;
	
	public Document downloadDocument(String name) throws ObjectNotFoundException;
	
}
