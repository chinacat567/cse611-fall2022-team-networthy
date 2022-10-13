package com.ub.networthy.services;

import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.payload.request.CoachProfileRequest;
import com.ub.networthy.repository.CoachProfileRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.Date;

@Service
public class CoachProfileService {

    @Autowired
    private CoachProfileRepository coachRepo;

    public void addCoach(@NotBlank String userId, @NotBlank String emailId, @NotBlank String firstName,
                         @NotBlank String lastName, @NotNull Date dateOfBirth, @NotBlank String gender, @NotBlank String occupation,
                         @NotBlank String education, @NotBlank String university, @NotBlank String location, String credentials,
                         @NotBlank boolean profileStatus, @NotNull MultipartFile resumeFile, @NotNull MultipartFile lor1File,
                         @NotNull MultipartFile lor2File) throws IOException {

        Binary resume = new Binary(BsonBinarySubType.BINARY, resumeFile.getBytes());
        Binary lor1 = new Binary(BsonBinarySubType.BINARY, lor1File.getBytes());
        Binary lor2 = new Binary(BsonBinarySubType.BINARY, lor2File.getBytes());

        CoachProfile coachProfile = new CoachProfile(userId, emailId, firstName, lastName, dateOfBirth,
                                                    gender, occupation, education, university, location,
                                                    credentials, profileStatus, resume, lor1, lor2);
        coachRepo.save(coachProfile);
    }

    public void addCoach(@NotBlank String userId, @NotBlank String emailId, @NotBlank String firstName,
                         @NotBlank String lastName, @NotNull Date dateOfBirth, @NotBlank String gender, @NotBlank String occupation,
                         @NotBlank String education, @NotBlank String university, @NotBlank String location, String credentials,
                         @NotBlank boolean profileStatus) throws IOException {

        CoachProfile coachProfile = new CoachProfile(userId, emailId, firstName, lastName, dateOfBirth,
                                                     gender, occupation, education, university, location,
                                                     credentials, profileStatus);
        coachRepo.save(coachProfile);
    }

    public void addCoach(@RequestBody CoachProfileRequest coachProfileRequest) throws IOException {

        CoachProfile coachProfile = new CoachProfile(coachProfileRequest.getUsername(), coachProfileRequest.getEmailId(),
                                                     coachProfileRequest.getFirstName(), coachProfileRequest.getLastName(),
                                                     coachProfileRequest.getDateOfBirth(), coachProfileRequest.getGender(),
                                                     coachProfileRequest.getOccupation(), coachProfileRequest.getEducation(),
                                                     coachProfileRequest.getUniversity(), coachProfileRequest.getLocation(),
                                                     coachProfileRequest.getCredentials(), coachProfileRequest.isProfileStatus());
        coachRepo.save(coachProfile);
    }

    public Binary getCoachResume(String username) {
        return coachRepo.findByUsername(username).getResume();
    }

    public Binary getLor1(String username) {
        return coachRepo.findByUsername(username).getLor1();
    }

    public Binary getLor2(String username) {
        return coachRepo.findByUsername(username).getLor2();
    }

    public CoachProfile getCoachData(String username) {
        return coachRepo.findByUsername(username);
    }
}
