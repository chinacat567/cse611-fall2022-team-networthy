package com.ub.networthy.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.models.ERole;
import com.ub.networthy.models.Role;
import com.ub.networthy.models.User;
import com.ub.networthy.payload.request.CoachDataRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.CoachProfileRepository;
import com.ub.networthy.repository.UserRepository;
import com.ub.networthy.utils.Utils;

import io.swagger.annotations.Api;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Api(tags = "Coach APIs")
@RestController
@RequestMapping("/api/coach")
public class CoachController {

    @Autowired
    private CoachProfileRepository coachProfileRepo;

    @Autowired
    private UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(CoachController.class);
    
    @Autowired
    private Utils utils;

    /* ADD COACH DATA : Add the CoachProfile excluding resume, LORs
    Function handles POST request of type "application/json" */
    @PostMapping("/add/data")
    public ResponseEntity<?>  addCoachData(@RequestBody CoachDataRequest coachDataRequest) {
        try {
            /* only Coach */
        	if(!utils.validateUser(coachDataRequest.getUsername())) {
        		return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: User does not exist!"));
        	}
        	
            if (!utils.validateRole(coachDataRequest.getUsername(), ERole.ROLE_COACH)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: User not authorized for coach profile!"));
            }

            if (coachProfileRepo.existsByUsername(coachDataRequest.getUsername())) {
                logger.error("Error: Coach already exists for Coach Username  " + coachDataRequest.getUsername());
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Coach Already Exists !"));
            }

            CoachProfile coachProfile = new CoachProfile(coachDataRequest.getUsername(), coachDataRequest.getEmailId(),
                    coachDataRequest.getFirstName(), coachDataRequest.getLastName(),
                    coachDataRequest.getDateOfBirth(), coachDataRequest.getGender(),
                    coachDataRequest.getOccupation(), coachDataRequest.getEducation(),
                    coachDataRequest.getUniversity(), coachDataRequest.getLocation(),
                    coachDataRequest.getCredentials(), coachDataRequest.isProfileStatus(),
                    coachDataRequest.getGeneral(), coachDataRequest.getCalendlyLink());

            coachProfileRepo.save(coachProfile);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to add Coach Data for Coach " + coachDataRequest.getUsername());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to add Coach Data"));
        }
        logger.info("Success : Added Coach Data SuccessFully for CoachId - " + coachDataRequest.getUsername());
        return ResponseEntity.ok(new MessageResponse("Coach Data Added Successfully!"));
    }

    /* GET COACH PROFILE : Get the entire CoachProfile document
     Function handles GET requests of type "application/json" */
    @GetMapping("/get/profile/{username}")
    public ResponseEntity<?> getCoachData(@PathVariable String username) {
        try {
            /* Give access irrespective of Role */
            if(!userRepository.existsByUsername(username)) {
                logger.error("Error: User Does Not Exist! - " + username);
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: User not authorized for coach profile!"));
            }

            /*return if coach does not already exists*/
            if (!coachProfileRepo.existsByUsername(username)) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Coach does not exists !"));
            }
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Optional<CoachProfile> coachData = coachProfileRepo.findByUsername(username);
            if (coachData.isPresent()) {
                return new ResponseEntity<>(coachData, headers, HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Coach Data for Coach " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Coach Data from DB !"));
        }
    }

    @GetMapping("/getAll")
	public List<CoachProfile> getAllCoachProfiles(){
		
    	List<CoachProfile> temp = coachProfileRepo.findAll(); 
    	List<CoachProfile> result = new ArrayList<>();
    	for (CoachProfile coachProfile : temp) {
    		if (coachProfile.isProfileStatus()) {
    			result.add(coachProfile);
    		}
    	}
    	
    	return result;
	}
}
