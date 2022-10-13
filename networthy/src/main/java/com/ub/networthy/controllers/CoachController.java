package com.ub.networthy.controllers;

import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.payload.request.ClientProfileRequest;
import com.ub.networthy.payload.request.CoachProfileRequest;
import com.ub.networthy.services.CoachProfileService;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping(value = "/")
public class CoachController {

    @Autowired
    CoachProfileService coachProfileService;

    @PostMapping("/coach/add/profile")
    public void addCoachProfileComplete(@RequestParam String userId, @RequestParam String emailId, @RequestParam String firstName,
                         @RequestParam String lastName, @RequestParam @DateTimeFormat(pattern="MMddyyyy") Date dob,
                         @RequestParam String gender, @RequestParam String occupation, @RequestParam String education,
                         @RequestParam String university, @RequestParam String location, @RequestParam String credentials,
                         @RequestParam Boolean profileStatus, @RequestParam MultipartFile resume,
                         @RequestParam MultipartFile lor1, @RequestParam MultipartFile lor2) throws IOException {

        try {
            coachProfileService.addCoach(userId, emailId, firstName, lastName,
                                        dob, gender, occupation, education,
                                        university, location, credentials,
                                        profileStatus, resume, lor1,  lor2);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/coach/add/data")
    public void addCoachProfile(@RequestParam String userId, @RequestParam String emailId, @RequestParam String firstName,
                         @RequestParam String lastName, @RequestParam @DateTimeFormat(pattern="MMddyyyy") Date dob,
                         @RequestParam String gender, @RequestParam String occupation, @RequestParam String education,
                         @RequestParam String university, @RequestParam String location, @RequestParam String credentials,
                         @RequestParam Boolean profileStatus) throws IOException {

        try {
            coachProfileService.addCoach(userId, emailId, firstName, lastName,
                                         dob, gender, occupation, education,
                                         university, location, credentials,
                                         profileStatus);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/coach/add")
    public void addCoachProfile(@RequestBody CoachProfileRequest coachProfileRequest) throws IOException {

        try {
            coachProfileService.addCoach(coachProfileRequest);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/coach/profile/{username}")
    public ResponseEntity<CoachProfile> getCoachData(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        CoachProfile coachProfile = coachProfileService.getCoachData(username);
        return new ResponseEntity<>(coachProfile, headers, HttpStatus.OK);
    }

    @GetMapping("/coach/resume/{username}")
    public ResponseEntity<byte[]> getResume(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        Binary resume = coachProfileService.getCoachResume(username);
        byte[] resumeByteArray = resume.getData();
        return new ResponseEntity<>(resumeByteArray, headers, HttpStatus.OK);
    }

    @GetMapping("/coach/lor1/{username}")
    public ResponseEntity<byte[]> getLor1(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        Binary resume = coachProfileService.getLor1(username);
        byte[] resumeByteArray = resume.getData();
        return new ResponseEntity<>(resumeByteArray, headers, HttpStatus.OK);
    }

    @GetMapping("/coach/lor2/{username}")
    public ResponseEntity<byte[]> getLor2(@PathVariable String username) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        Binary resume = coachProfileService.getLor2(username);
        byte[] resumeByteArray = resume.getData();
        return new ResponseEntity<>(resumeByteArray, headers, HttpStatus.OK);
    }
}
