package com.ub.networthy.controllers;

import com.ub.networthy.models.ClientAndCoachRelation;
import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientAndCoachRelationRepository;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.CoachProfileRepository;
import com.ub.networthy.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/clientAndCoach")
public class ClientCoachRelationController {

    @Autowired
    private ClientAndCoachRelationRepository clientCoachRelationRepo;

    @Autowired
    private CoachProfileRepository coachProfileRepo;

    @Autowired
    private ClientProfileRepository clientProfileRepo;

    private Logger logger = LoggerFactory.getLogger(ClientCoachRelationController.class);

    @Autowired
    private Utils utils;

    @PostMapping("/add/{coachId}/{clientId}")
    public ResponseEntity<?> addCoachForClient(@PathVariable String clientId, @PathVariable String coachId) {
        try {
            /* validate clientId, coachId */
            if (!utils.coachExists(coachId) || !utils.clientExists(clientId)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Coach/Client do not exist"));
            }
            /* validate that Client does not already have a Coach. A Client can have only 1 Coach at a time */
            if (clientCoachRelationRepo.existsByClientUsername(clientId)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Client has an existing Coach"));
            }
            ClientAndCoachRelation clientCoachRelation = new ClientAndCoachRelation(clientId, coachId);
            clientCoachRelationRepo.save(clientCoachRelation);
            return ResponseEntity.ok(new MessageResponse("ClientCoach Relation Added Successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Coach/Client Data, clientId " + clientId + " coachId " + coachId);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Add Coach for Client !"));
        }
    }

    @DeleteMapping("/delete/{coachId}/{clientId}")
    public ResponseEntity<?> deleteCoachForClient(@PathVariable String clientId, @PathVariable String coachId) {
        try {
            /* validate clientId, coachId */
            if (!utils.coachExists(coachId) || !utils.clientExists(clientId)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Coach/Client do not exist"));
            }
            /* validate that Client-Coach Relation exists before trying to delete */
            if (!clientCoachRelationRepo.existsByClientUsernameAndCoachUsername(clientId, coachId)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: No Client-Coach Relation Found"));
            }
            clientCoachRelationRepo.deleteClientAndCoachRelationByClientUsernameAndCoachUsername(clientId, coachId);
            return ResponseEntity.ok(new MessageResponse("ClientCoach Relation Deleted Successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Coach/Client Data, clientId " + clientId + " coachId " + coachId);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Add Coach for Client !"));
        }
    }

    @GetMapping("/get/coach/{clientId}")
    public ResponseEntity<?> getCoachForClient(@PathVariable String clientId) {
        try {
            /* validate clientId */
            if (!utils.clientExists(clientId)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Client does not exist"));
            }

            Optional<ClientAndCoachRelation> clientAndCoachRelation  = clientCoachRelationRepo.findFirstByClientUsername(clientId);
            if (clientAndCoachRelation.isPresent()) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                Optional<CoachProfile> coachProfile = coachProfileRepo.findByUsername(clientAndCoachRelation.get().getCoachUserId());
                if (coachProfile.isEmpty()) {
                    logger.error("Error: Data Inconsistency Encountered. ClintCoachRelation Exists While Coach Not Found");
                    return new ResponseEntity(HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<>(coachProfile.get(), headers, HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Coach Data for Client " + clientId);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Coach Data for Client !"));
        }
    }

    @GetMapping("/get/clients/{coachId}")
    public ResponseEntity<?> getAllClientsForCoach(@PathVariable String coachId) {
        try {
            /* validate coachId */
            if (!utils.coachExists(coachId)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Coach does not exist"));
            }
            List<ClientAndCoachRelation> clientAndCoachRelations = clientCoachRelationRepo.findAllByCoachUsername(coachId);
            if (clientAndCoachRelations != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                List<ClientProfile> clientProfiles = clientAndCoachRelations.stream()
                        .map(a -> clientProfileRepo.findByUsername(a.getClientUsername()))
                        .collect(Collectors.toList());
                if (clientProfiles.contains(null)) {
                    logger.error("Error: Data Inconsistency Encountered. ClintCoachRelation Exists While Client Not Found");
                }
                List<ClientProfile> clientProfilesCleaned = clientProfiles.stream().filter(Objects::nonNull).collect(Collectors.toList());
                if (clientProfilesCleaned.isEmpty()) {
                    return new ResponseEntity(HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<>(clientProfilesCleaned, headers, HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Clients  for Coach " + coachId);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Clients for Coach !"));
        }
    }
}
