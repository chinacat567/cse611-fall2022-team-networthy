package com.ub.networthy.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.controllers.AuthController;
import com.ub.networthy.models.ClientGoal;
import com.ub.networthy.models.PersonalizedContent;
import com.ub.networthy.payload.request.PersonalizedContentRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientGoalRepository;
import com.ub.networthy.repository.PersonalizedContentRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/personalizedContent")
public class PersonalizedContentService
{
	
	@Autowired
	PersonalizedContentRepository personalizedContentRepository;
	
	@Autowired
	ClientGoalRepository clientGoalRepository;
	
	private Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@PostMapping("/addPersonalizedContent")
	public ResponseEntity<?> addPersonalizedContent(@RequestBody PersonalizedContentRequest persoanlizedContentRequest)
	{
		persoanlizedContentRequest.setPersonalizedContentID(UUID.randomUUID().toString());
		
		try
		{
			PersonalizedContent personalizedContent = new PersonalizedContent(persoanlizedContentRequest.getPersonalizedContentID(),
					persoanlizedContentRequest.getPcAuthor(), persoanlizedContentRequest.getPcDescription(),
					persoanlizedContentRequest.getPcLink(), persoanlizedContentRequest.getPcTag(),
					persoanlizedContentRequest.getPcTitle(), persoanlizedContentRequest.getPcType());
			
			personalizedContentRepository.save(personalizedContent);

		}
		catch(Exception e)
		{
			e.printStackTrace();
            logger.error("Failed to add  personalized content");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Failed to add personalized content"));
       
		}
		
		return ResponseEntity.ok(new MessageResponse("Added Personalized Content successfully !"));
	}
	
	@GetMapping("/getAllPersonalizedContentClient/{clientId}")
	public List<PersonalizedContent> getAllPersonalizedContentForClient(@PathVariable String clientId)
	{
		
		List<PersonalizedContent> personalizedContentForClient = new ArrayList<>();
		try
		{
			List<ClientGoal> clientGoals = clientGoalRepository.findAllByClientUsername(clientId);
			
			for(ClientGoal clientGoal : clientGoals)
			{
				List<String> goalTags = clientGoal.getGoalTags();
				
				for(String goalTag : goalTags)
				{
					personalizedContentForClient = personalizedContentRepository.findAllByTag(goalTag);
				}
				
			}
		}
		catch(Exception e)
		{
			 e.printStackTrace();
	            logger.error("Failed to fetch personalized Content");
	       
		}
		
		return personalizedContentForClient;
	}
	
	
}