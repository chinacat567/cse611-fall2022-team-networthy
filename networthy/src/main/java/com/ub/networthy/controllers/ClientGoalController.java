package com.ub.networthy.controllers;


import com.ub.networthy.models.ClientGoal;
import com.ub.networthy.models.GoalStatus;
import com.ub.networthy.payload.request.ClientGoalRequest;
import com.ub.networthy.payload.request.GoalStatusChangeRequest;
import com.ub.networthy.payload.response.ClientGoalsResponse;
import com.ub.networthy.payload.response.JwtResponse;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.UserRepository;
import com.ub.networthy.services.ClientGoalService;
import com.ub.networthy.utils.Utils;

import io.swagger.annotations.Api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "Client Goal APIs")
@RestController
@RequestMapping("/api/clientGoal")
public class ClientGoalController {

    @Autowired
    ClientGoalService clientGoalService;
    
    @Autowired
    UserRepository userRepository;
    
   

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/addGoal")
    public ResponseEntity<?> addGoal(@RequestBody ClientGoalRequest clientGoalRequest) {
        try {
        	if(userRepository.findByUsername(clientGoalRequest.getClientUsername()).get() == null) {
        		return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Client ID Does not exist " + clientGoalRequest.getClientUsername()));
        	}
        	
            clientGoalService.addGoalForClient(clientGoalRequest);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to add Goal");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to add goal for clientId " + clientGoalRequest.getClientUsername()));
        }
        return ResponseEntity.ok(new MessageResponse("Added Goal for Client successfully !"));
    }
    
    @GetMapping("/getAllGoals/{clientId}")
    public ResponseEntity<?> getAllGoalsForClient(@PathVariable String clientId) {
    	List<ClientGoal> result;
    	try {
    		if(userRepository.findByUsername(clientId).get() == null) {
    			return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Client ID Does not exist " + clientId));
    		}
    		
    		result = clientGoalService.getAllGoalsForClient(clientId);
    	}catch(Exception e) {
    		e.printStackTrace();
            logger.error("Failed to update Goal");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Goal does not exists for " + clientId));
    	}
    	
    	return ResponseEntity.ok(new ClientGoalsResponse(clientId, result));
    }
    //Change to Goal Status
    @PostMapping("/updateGoal")
    public ResponseEntity<?> updateGoalStatus(@RequestBody GoalStatusChangeRequest goalStatusChangeRequest) {
        try {
        	
        	return clientGoalService.updateGoalStatus(goalStatusChangeRequest);
        	
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to update Goal");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Failed to Update Goal"));
        }
       
    }
    
    @PutMapping("/editGoal")
    public ResponseEntity<?> editGoal(@RequestBody ClientGoalRequest clientGoal) {
    	
    	ClientGoal editedGoal = clientGoalService.editClientGoal(clientGoal);
    	
    	 return ResponseEntity.ok(new MessageResponse("Goal Edited Successfully"));
    	
    }

    @PostMapping("/addTagsForGoal/{clientId}")
    public ResponseEntity<?> addTagsForGoal(@RequestParam List<String> tags, @PathVariable String clientId) {
        try {
            clientGoalService.addTagsForGoal(clientId, tags);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to update tags for Goal");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to add tags for clientId " + clientId));
        }
        return ResponseEntity.ok(new MessageResponse("Updated Tags for Goal successfully !"));
    }
}
