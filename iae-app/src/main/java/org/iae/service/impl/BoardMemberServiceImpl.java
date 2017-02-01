package org.iae.service.impl;

import java.util.List;

import org.iae.pojo.BoardMember;
import org.iae.repository.BoardMemberRepository;
import org.iae.service.BoardMemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardMemberServiceImpl implements BoardMemberService {

	private static final Logger logger = LoggerFactory.getLogger(BoardMemberService.class);
	
	@Autowired
	private BoardMemberRepository boardMemberRepository;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<BoardMember> getAllBoardMembers() {
		logger.debug("Entered into getAllBoardMembers()"); 
		return (List<BoardMember>) boardMemberRepository.findAll();
	}

}
