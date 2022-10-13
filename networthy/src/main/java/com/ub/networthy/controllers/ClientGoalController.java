package com.ub.networthy.controllers;


import com.ub.networthy.payload.request.ClientGoalRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.services.ClientGoalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/clientGoal")
public class ClientGoalController {

    @Autowired
    ClientGoalService clientGoalService;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/addGoal/")
    public ResponseEntity<?> addGoal(@RequestBody ClientGoalRequest clientGoalRequest) {
        try {
            clientGoalService.addGoalForClient(clientGoalRequest);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to add Goal");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to add goal for clientId " + clientGoalRequest.getClientId()));
        }
        return ResponseEntity.ok(new MessageResponse("Added Goal for Client successfully !"));
    }

    @PostMapping("/updateGoal/{clientId}")
    public ResponseEntity<?> updateGoalStatus(@RequestParam String updateStatus, @PathVariable String clientId) {
        try {
            clientGoalService.updateGoalStatus(clientId, updateStatus);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to update Goal");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Goal does not exists for " + clientId));
        }
        return ResponseEntity.ok(new MessageResponse("Updated Goal for Client successfully !"));
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
