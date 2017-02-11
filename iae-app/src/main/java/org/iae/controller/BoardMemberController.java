package org.iae.controller;

import java.util.List;

import org.iae.pojo.BoardMember;
import org.iae.service.BoardMemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/boardmembers")
public class BoardMemberController {

	private static final Logger logger = LoggerFactory.getLogger(BoardMemberController.class);
	
	@Autowired
	private BoardMemberService boardMemberService;

    @RequestMapping(path="", method=RequestMethod.GET)
    public ResponseEntity<Object> getAllBoardMembers() {

    	logger.debug("Entered into getAllBoardMembers()");

    	List<BoardMember> boardMembers = boardMemberService.getAllBoardMembers();

    	logger.debug("Exit from getAllBoardMembers()");

    	if(boardMembers != null) {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(boardMembers);
    	} else {
    		return ResponseEntity
    				.status(HttpStatus.OK)
    				.body("No Board Members available");	
    	}
    }
}