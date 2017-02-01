package org.iae.repository;

import java.util.List;

import org.iae.pojo.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;

public interface DocumentRepository extends CrudRepository<Document, Long> {

	Page<Document> findAll();

	List<Document> findAllByDocType(String docType);
	
}
