package com.ub.networthy.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.models.PersonalizedContent;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientGoalRepository;
import com.ub.networthy.repository.PersonalizedContentRepository;
import com.ub.networthy.repository.TagsRepository;

import io.swagger.annotations.Api;

@Api(tags = "Personalized Content APIs")
@RestController
@RequestMapping("/api/content")
public class PersonalizedContentController {

	@Autowired
	PersonalizedContentRepository personalizedContentRepository;
	
	@Autowired
	ClientGoalRepository clientGoalRepository;
	
	@Autowired
	TagsRepository tagsRepository;
	
	
	@GetMapping("/getAll/{tag}")
	public ResponseEntity<?> getContentForTag(@PathVariable String tag) {
		
		List<PersonalizedContent> contentList = new ArrayList<>();
		
		try {
			if(tagsRepository.existsByName(tag)) {
				
				contentList = personalizedContentRepository.findAllByTag(tag);
			}else {
				return ResponseEntity
						.badRequest()
						.body(new MessageResponse("Error: Tag Does Not Exist"));
			}
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Fetching Content"));
		}
		
		return  ResponseEntity.ok(contentList);
		
	}
	
	@GetMapping("getAll/goal/{goalId}")
	public ResponseEntity<?> getContentForGoal(@PathVariable String goalId) {
		
		List<PersonalizedContent> contentList = new ArrayList<>();
		
		try {
			if(clientGoalRepository.existsById(goalId)) {
				
				List<String> goalTags = clientGoalRepository.findByGoalId(goalId).getGoalTags();
				
				for (String tag : goalTags) {
					
					if(tagsRepository.existsByName(tag)) {
						contentList.addAll(personalizedContentRepository.findAllByTag(tag));
					}
				}
			} else {
				return ResponseEntity
						.badRequest()
						.body(new MessageResponse("Error: Goal Does Not Exist"));
			}
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Fetching Content"));
		}
		
		return  ResponseEntity.ok(contentList);
		
	} 
}
