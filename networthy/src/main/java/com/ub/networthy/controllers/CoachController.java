package com.ub.networthy.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.payload.request.CoachDataRequest;
import com.ub.networthy.payload.request.CoachProfileRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.services.CoachProfileService;
import org.bson.types.Binary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/coach")
public class CoachController {

    @Autowired
    CoachProfileService coachProfileService;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    /* ADD COACH PROFILE : Add/Update the entire CoachProfile object (including resume, LORs)
     Function handles POST requests of type "multipart/form-data" */
    @PostMapping("/add/profile")
    public void addCoachProfile(@NotNull @RequestParam (value = "coachData") String coachDataRequestString,
                                @NotNull @RequestPart (value="resume") MultipartFile resumeFile,
                                @NotNull  @RequestPart (value="lor1") MultipartFile lor1File,
                                @NotNull @RequestPart (value="lor2") MultipartFile lor2File) throws IOException {

        CoachDataRequest coachDataRequest = new CoachDataRequest();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            coachDataRequest = objectMapper.readValue(coachDataRequestString, CoachDataRequest.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            logger.error("Error: Failed to deserialize coachData, check JSON formatting" + coachDataRequest.getUsername());
        }
        try {
            coachProfileService.addCoachProfile(coachDataRequest, resumeFile, lor1File, lor2File);
        } catch (IOException e) {
            e.printStackTrace(); // to be removed
            logger.error("Error: Failed to add Coach Profile for CoachId  " + coachDataRequest.getUsername());
        }
        logger.info("Success : Added Coach Profile SuccessFully for CoachId - " + coachDataRequest.getUsername());
    }

    /* ADD COACH DATA : Add/Update the CoachProfile excluding resume, LORs
    Function handles POST request of type "application/json" */
    @PostMapping("/add/data")
    public void addCoachData(@RequestBody CoachDataRequest coachDataRequest) throws IOException {

        try {
            coachProfileService.addCoachData(coachDataRequest);
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("Error: Failed to add Coach Data for CoachId  " + coachDataRequest.getUsername());
        }
        logger.info("Success : Added Coach Data SuccessFully for CoachId - " + coachDataRequest.getUsername());
    }

    /* GET COACH PROFILE : Get the entire CoachProfile document
     Function handles GET requests of type "application/json" */
    @GetMapping("/get/profile/{username}")
    public ResponseEntity<?> getCoachData(@PathVariable String username) {
        /*return if coach does not already exists*/
        if (!coachProfileService.coachExists(username)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Coach does not exists !"));
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        CoachProfile coachProfile;
        try {
             coachProfile = coachProfileService.getCoachProfile(username);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Coach Data for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Coach Data from DB !"));
        }
        return new ResponseEntity<>(coachProfile, headers, HttpStatus.OK);
    }

    @GetMapping("/get/resume/{username}")
    public ResponseEntity<?> getResume(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        Binary resume;
        try {
             resume = coachProfileService.getCoachResume(username);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Resume for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Resume for Coach !"));
        }

        if (resume != null) {
            byte[] resumeByteArray = resume.getData();
            return new ResponseEntity<>(resumeByteArray, headers, HttpStatus.OK);
        }
        else {
            logger.error("Error: Failed to Get Resume for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Resume for Coach !"));
        }




    }

    @GetMapping("/get/lor1/{username}")
    public ResponseEntity<?> getLor1(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        Binary lor1;
        try {
            lor1 = coachProfileService.getLor1(username);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Lor1 for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Lor1 for Coach !"));
        }

        if (lor1 != null) {
            byte[] resumeByteArray = lor1.getData();
            return new ResponseEntity<>(resumeByteArray, headers, HttpStatus.OK);
        }
        else {
            logger.error("Error: Failed to Get Lor1 for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Lor1 for Coach !"));
        }
    }

    @GetMapping("/get/lor2/{username}")
    public ResponseEntity<?> getLor2(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        Binary lor2;
        try {
            lor2 = coachProfileService.getLor2(username);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Lor2 for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Lor2 for Coach !"));
        }

        if (lor2 != null) {
            byte[] resumeByteArray = lor2.getData();
            return new ResponseEntity<>(resumeByteArray, headers, HttpStatus.OK);
        }
        else {
            logger.error("Error: Failed to Get Lor2 for CoachId  " + username);
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Failed to Get Lor2 for Coach !"));
        }
    }
}
