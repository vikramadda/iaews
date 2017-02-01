package org.iae.repository;

import org.iae.pojo.BoardMember;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardMemberRepository extends CrudRepository<BoardMember, Long> {

	Page<BoardMember> findAll();
	
}
