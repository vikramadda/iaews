package org.iae.repository;

import org.iae.pojo.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;

public interface DocumentRepository extends CrudRepository<Document, Long> {

	Page<Document> findAll();

	Page<Document> findAllByDocType(String docType);

	
}
