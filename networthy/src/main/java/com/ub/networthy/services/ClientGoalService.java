package com.ub.networthy.services;


import com.ub.networthy.models.ClientGoal;
import com.ub.networthy.models.GoalStatus;
import com.ub.networthy.payload.request.ClientGoalRequest;
import com.ub.networthy.payload.request.GoalStatusChangeRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientGoalRepository;
import com.ub.networthy.utils.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientGoalService {

    @Autowired
    private ClientGoalRepository clientGoalRepo;
    
    @Autowired
    Utils utils;

    @Transactional
    public void addGoalForClient(@NotNull ClientGoalRequest clientGoalRequest) {
        /* set GoalId to a randomly generated 128 bit UUID */
        clientGoalRequest.setGoalId(UUID.randomUUID().toString());

        ClientGoal clientGoal = new ClientGoal(clientGoalRequest.getClientUsername(), clientGoalRequest.getGoalId(),
                                               clientGoalRequest.getGoalStatus(), clientGoalRequest.getGoalReviewCoachId(),
                                               clientGoalRequest.getGoalTittle(), clientGoalRequest.getGoalDescription(),
                                               clientGoalRequest.getGoalSpecific(), clientGoalRequest.getGoalMeasurable(),
                                               clientGoalRequest.getGoalAttainable(), clientGoalRequest.getGoalRelevant(),
                                               clientGoalRequest.getGoalTimeBased(), clientGoalRequest.getGoalTags());

        clientGoalRepo.save(clientGoal);

    }
    
    public List<ClientGoal> getAllGoalsForClient(String clientUsername) {
    	
    	 return clientGoalRepo.findAllByClientUsername(clientUsername);

    }

    public ResponseEntity<?> updateGoalStatus(@NotBlank GoalStatusChangeRequest goalStatusChangeRequest) {
        
    	if(!utils.clientExists(goalStatusChangeRequest.getClientId())) {
    		return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Client ID Does not exist " + goalStatusChangeRequest.getClientId()));
    	}
    	
    	ClientGoal clientGoal = clientGoalRepo.findByGoalId(goalStatusChangeRequest.getGoalId());
    	
    	if(!clientGoal.getClientUsername().equals(goalStatusChangeRequest.getClientId())) {
    		return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Goal Does not belong to " + goalStatusChangeRequest.getClientId()));
    	}
    	
    	if(clientGoal.getGoalStatus().equals(GoalStatus.FINISHED)) {
    		return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Goal Already in FINISHED Status " + goalStatusChangeRequest.getGoalId()));
    	}
    	
    	clientGoal.setGoalStatus(goalStatusChangeRequest.getUpdatedStatus());
    	
    	clientGoalRepo.save(clientGoal);
    	
    	return ResponseEntity.ok(new MessageResponse("Goal Status Updated to - " + clientGoal.getGoalStatus()));

    }
    
    public ClientGoal editClientGoal(@NotBlank ClientGoalRequest editClientGoal) {
    	
    	String id = editClientGoal.getGoalId();
    	
    	ClientGoal clientGoal = clientGoalRepo.findByGoalId(id);
    	
    	
    	if(editClientGoal.getGoalSpecific() != null) clientGoal.setGoalSpecific(editClientGoal.getGoalSpecific());
    	if(editClientGoal.getGoalMeasurable() != null) clientGoal.setGoalMeasurable(editClientGoal.getGoalMeasurable());
    	if(editClientGoal.getGoalAttainable() != null) clientGoal.setGoalAttainable(editClientGoal.getGoalAttainable());
    	if(editClientGoal.getGoalRelevant() != null) clientGoal.setGoalRelevant(editClientGoal.getGoalRelevant());
    	if(editClientGoal.getGoalTimeBased() != null) clientGoal.setGoalTimeBased(editClientGoal.getGoalTimeBased());
    	if(editClientGoal.getGoalDescription() != null) clientGoal.setGoalDescription(editClientGoal.getGoalDescription());
    	if(editClientGoal.getGoalReviewCoachId() != null) clientGoal.setGoalReviewCoachId(editClientGoal.getGoalReviewCoachId());
    	if(editClientGoal.getGoalTags() != null) clientGoal.setGoalTags(editClientGoal.getGoalTags());
    	if(editClientGoal.getGoalStatus() != null) clientGoal.setGoalStatus(editClientGoal.getGoalStatus());
    	
    	clientGoalRepo.save(clientGoal);
    	
    	return clientGoal;
    	
    	 
    }

    public void addTagsForGoal(@NotBlank String clientId, @NotNull List<String> newTags) {
        Optional<ClientGoal> clientGoal = clientGoalRepo.findAllByClientUsername(clientId).stream().findFirst();
        if (clientGoal.isPresent()) {

            ClientGoal clientGoalOld = clientGoal.get();
            List<String> updatedTags = new ArrayList<>(clientGoalOld.getGoalTags());
            updatedTags.addAll(newTags);

            ClientGoal updatedClientGoal = new ClientGoal(clientGoalOld.getClientUsername(), clientGoalOld.getGoalId(),
                    clientGoalOld.getGoalStatus(), clientGoalOld.getGoalReviewCoachId(),
                    clientGoalOld.getGoalTittle(), clientGoalOld.getGoalDescription(),
                    clientGoalOld.getGoalSpecific(), clientGoalOld.getGoalMeasurable(),
                    clientGoalOld.getGoalAttainable(), clientGoalOld.getGoalRelevant(),
                    clientGoalOld.getGoalTimeBased(), updatedTags);

            clientGoalRepo.save(updatedClientGoal);
        }
        else {
            throw new UsernameNotFoundException(clientId);
        }
    }
}
