package com.ub.networthy.controllers;

import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.services.ClientCoachRelationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/")
public class ClientCoachRelationController {

    @Autowired
    ClientCoachRelationService clientCoachRelationService;

    Logger logger = LoggerFactory.getLogger(ClientController.class);

    @PostMapping("/client/{clientId}/add/{coachId}")
    public void addCoachForClientController(@PathVariable String clientId, @PathVariable String coachId) {
        clientCoachRelationService.addCoachForClient(clientId, coachId);
    }

    @GetMapping("/client/{clientId}/delete/{coachId}")
    public void deleteCoachForClient(@PathVariable String clientId, @PathVariable String coachId) {
        clientCoachRelationService.deleteClientCoachRelation(clientId, coachId);
    }

    @PostMapping("/client/{clientId}/getCoaches")
    public ResponseEntity<?> getCoachForClient(@PathVariable String clientId) {
        HttpHeaders headers = new HttpHeaders();
        List<CoachProfile> coachesForClient =  clientCoachRelationService.getAllCoachesForClient(clientId);
        return new ResponseEntity<>(coachesForClient, headers, HttpStatus.OK);
    }

    @PostMapping("/coach/{coachId}/getClients")
    public ResponseEntity<?> getClientsForCoach(@PathVariable String coachId) {
        HttpHeaders headers = new HttpHeaders();
        List<ClientProfile> coachesForClient =  clientCoachRelationService.getAllClientsForCoach(coachId);
        return new ResponseEntity<>(coachesForClient, headers, HttpStatus.OK);
    }

}
