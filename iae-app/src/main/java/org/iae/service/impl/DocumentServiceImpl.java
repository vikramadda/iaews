package org.iae.service.impl;

import org.iae.exception.ObjectNotFoundException;
import org.iae.exception.OperationFailedException;
import org.iae.pojo.Document;
import org.iae.repository.DocumentRepository;
import org.iae.service.DocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentServiceImpl implements DocumentService {

	private static final Logger logger = LoggerFactory.getLogger(DocumentService.class);
	
	@Autowired
	private DocumentRepository documentRepository;
	
	@Override
	public Document uploadDocument(Document document) throws OperationFailedException {
		logger.debug("Entered into uploadDocument()");
		return documentRepository.save(document);
	}

	@Override
	public Document downloadDocument(String name) throws ObjectNotFoundException {
		logger.debug("Entered into downloadDocument()");
		return null;
	}
}