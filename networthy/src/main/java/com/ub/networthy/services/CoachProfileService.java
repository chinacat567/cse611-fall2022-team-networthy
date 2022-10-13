package com.ub.networthy.services;

import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.payload.request.CoachDataRequest;
import com.ub.networthy.payload.request.CoachProfileRequest;
import com.ub.networthy.repository.CoachProfileRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;

@Service
public class CoachProfileService {

    @Autowired
    private CoachProfileRepository coachRepo;

    /* function for handling POST request of type "application/json" */
    public void addCoachData(@RequestBody CoachDataRequest coachDataRequest) throws IOException {

        CoachProfile coachProfile = new CoachProfile(coachDataRequest.getUsername(), coachDataRequest.getEmailId(),
                                                     coachDataRequest.getFirstName(), coachDataRequest.getLastName(),
                                                     coachDataRequest.getDateOfBirth(), coachDataRequest.getGender(),
                                                     coachDataRequest.getOccupation(), coachDataRequest.getEducation(),
                                                     coachDataRequest.getUniversity(), coachDataRequest.getLocation(),
                                                     coachDataRequest.getCredentials(), coachDataRequest.isProfileStatus());
        coachRepo.save(coachProfile);
    }

//    /* function for handling POST requests of type "multipart/form-data" */
//    public void addCoachProfile(@RequestBody CoachProfileRequest coachProfileRequest) throws IOException {
//
//        CoachProfile coachProfile = new CoachProfile(coachProfileRequest.getUsername(), coachProfileRequest.getEmailId(),
//                                                     coachProfileRequest.getFirstName(), coachProfileRequest.getLastName(),
//                                                     coachProfileRequest.getDateOfBirth(), coachProfileRequest.getGender(),
//                                                     coachProfileRequest.getOccupation(), coachProfileRequest.getEducation(),
//                                                     coachProfileRequest.getUniversity(), coachProfileRequest.getLocation(),
//                                                     coachProfileRequest.getCredentials(), coachProfileRequest.isProfileStatus(),
//                                                     coachProfileRequest.getResume(), coachProfileRequest.getLor1(),
//                                                     coachProfileRequest.getLor2());
//        coachRepo.save(coachProfile);
//    }

    /* function for handling POST requests of type "multipart/form-data" */
    public void addCoachProfile(@NotNull CoachDataRequest coachDataRequest,
                                @NotNull MultipartFile resumeFile,
                                @NotNull MultipartFile lor1File,
                                @NotNull MultipartFile lor2File) throws IOException {

        Binary resume = new Binary(BsonBinarySubType.BINARY, resumeFile.getBytes());
        Binary lor1 = new Binary(BsonBinarySubType.BINARY, lor1File.getBytes());
        Binary lor2 = new Binary(BsonBinarySubType.BINARY, lor2File.getBytes());

        CoachProfile coachProfile = new CoachProfile(coachDataRequest.getUsername(), coachDataRequest.getEmailId(),
                                                     coachDataRequest.getFirstName(), coachDataRequest.getLastName(),
                                                     coachDataRequest.getDateOfBirth(), coachDataRequest.getGender(),
                                                     coachDataRequest.getOccupation(), coachDataRequest.getEducation(),
                                                     coachDataRequest.getUniversity(), coachDataRequest.getLocation(),
                                                     coachDataRequest.getCredentials(), coachDataRequest.isProfileStatus(),
                                                     resume, lor1, lor2);
        coachRepo.save(coachProfile);
    }

    /* function for handling GET request of type "application/json" */
    public Binary getCoachResume(String username) {
        return coachRepo.findByUsername(username).getResume();
    }

    public Binary getLor1(String username) {
        return coachRepo.findByUsername(username).getLor1();
    }

    public Binary getLor2(String username) {
        return coachRepo.findByUsername(username).getLor2();
    }

    public CoachProfile getCoachProfile(String username) {
        return coachRepo.findByUsername(username);
    }

    public boolean coachExists(String username) {
        return coachRepo.existsByUsername(username);
    }
}
