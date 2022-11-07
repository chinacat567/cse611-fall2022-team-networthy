package com.ub.networthy.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.models.CoachComment;
import com.ub.networthy.payload.response.ClientGoalsResponse;
import com.ub.networthy.payload.response.CoachCommentsCoachIdResponse;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.CoachCommentRepository;
import com.ub.networthy.utils.Utils;

import io.swagger.annotations.Api;

@Api(tags = "Coach Comment APIs")
@RestController
@RequestMapping("/api/comment")
public class CoachCommentController {

	@Autowired
	private Utils utils;
	
	@Autowired
	private CoachCommentRepository coachCommentrepository;
	
	
	@PostMapping("/add")
	public ResponseEntity<?> addCoachComment(@RequestBody CoachComment coachComment){
		
		if(!utils.coachExists(coachComment.getCoachId())) {
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Coach ID Does not exist " + coachComment.getCoachId()));
		}
		
		if(!utils.clientExists(coachComment.getClientId())) {
    		return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Client ID Does not exist " + coachComment.getClientId()));
    	}
		
		if(!utils.isValidGoal(coachComment.getGoalId())) {
    		return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Goal ID Does not exist " + coachComment.getGoalId()));
    	}

		if(coachComment.getComment() == null || coachComment.getComment().isEmpty()) {
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Comment cannot be Empty "));
		}
		
		CoachComment savedComment = coachCommentrepository.save(coachComment);
		return ResponseEntity.ok(new MessageResponse("Comment added successfully. Comment ID - " + savedComment.getId()));
	}
	
	@GetMapping("/getComments/coach/{coachId}")
	public ResponseEntity<?> getCommentsForCoach(@PathVariable String coachId) {
		List<CoachComment> comments;
		if(!utils.coachExists(coachId)) {
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Coach ID Does not exist " + coachId));
		}
		
		try {
			comments = coachCommentrepository.findAllByCoachId(coachId);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
		}
		
		return ResponseEntity.ok(comments); 
		
	}
	
	@GetMapping("/getComments/client/{clientId}")
	public ResponseEntity<?> getCommentsForClient(@PathVariable String clientId) {
		List<CoachComment> comments;
		if(!utils.clientExists(clientId)) {
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Client ID Does not exist " + clientId));
		}
		
		try {
			comments = coachCommentrepository.findAllByClientId(clientId);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
		}
		
		return ResponseEntity.ok(comments); 
		
	}
}
