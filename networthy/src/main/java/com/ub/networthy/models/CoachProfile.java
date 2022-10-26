package com.ub.networthy.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Document(collection = "coachprofile")
public class CoachProfile {

    @Id
    private String id;

    @Field("COA_COACH_ID")
    @NotBlank
    private String username;

    @Field("COA_EMAIL")
    @NotBlank
    private String emailId;

    @Field("COA_FIRST_NAME")
    @NotBlank
    private String firstName;

    @Field("COA_LAST_NAME")
    @NotBlank
    private String lastName;

    @Field("COA_DOB")
    @NotBlank
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date dateOfBirth;

    @Field("COA_GENDER")
    @NotBlank
    private String gender;

    @Field("COA_OCCUPATION")
    @NotBlank
    private String occupation;

    @Field("COA_EDUCATION")
    @NotBlank
    private String education;

    @Field("COA_UNIVERSITY")
    @NotBlank
    private String university;

    @Field("COA_LOCATION")
    @NotBlank
    private String location;

    /* credentials can be left blank */
    @Field("COA_CREDS")
    private String credentials;

    @Field("COA_PROFILE_STATUS")
    @NotBlank
    private boolean profileStatus;
    
    @Field("COA_GENERAL")
    @NotBlank
    private String general;

    /* resume, lor1, lor2 can be NULL */
    @Field("COA_RESUME")
    private Binary resume;

    @Field("COA_LOR1")
    private Binary lor1;

    @Field("COA_LOR2")
    private Binary lor2;

    public CoachProfile() {

    }

    /* constructor for POSTING "application/json" */
    public CoachProfile(@NotBlank String username, @NotBlank String emailId, @NotBlank String firstName,
                        @NotBlank String lastName, @NotBlank Date dateOfBirth, @NotBlank String gender, @NotBlank String occupation,
                        @NotBlank String education, @NotBlank String university, @NotBlank String location, String credentials,
                        @NotBlank boolean profileStatus, @NotBlank String general) {
        super();
        this.username = username;
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.occupation = occupation;
        this.education = education;
        this.university = university;
        this.location = location;
        this.credentials = credentials;
        this.profileStatus = profileStatus;
    }

    /* constructor for POSTING "multipart/form-data" */
    public CoachProfile(@NotBlank String userId, @NotBlank String emailId, @NotBlank String firstName,
                        @NotBlank String lastName, @NotBlank Date dateOfBirth, @NotBlank String gender, @NotBlank String occupation,
                        @NotBlank String education, @NotBlank String university, @NotBlank String location, String credentials,
                        @NotBlank boolean profileStatus, @NotNull String general, @NotNull Binary resume, @NotNull Binary lor1, @NotNull Binary lor2) {

        this(userId, emailId, firstName, lastName, dateOfBirth, gender, occupation,
                education, university, location, credentials, profileStatus, general);

        this.resume = resume;
        this.lor1 = lor1;
        this.lor2 = lor2;
    }

    public String getUsername() {
        return username;
    }
    

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCredentials(String credentials) {
        this.credentials = credentials;
    }

    public String getCredentials() {
        return this.credentials;
    }

    public boolean isProfileStatus() {
        return profileStatus;
    }

    public void setProfileStatus(boolean profileStatus) {
        this.profileStatus = profileStatus;
    }
    
	public String getGeneral() {
		return general;
	}

	public void setGeneral(String general) {
		this.general = general;
	}


    public void setResume(Binary resume) {
        this.resume = resume;
    }

    public Binary getResume() {
        return this.resume;
    }

    public void setLor1(Binary lor1) {
        this.lor1 = lor1;
    }

    public Binary getLor1() {
        return this.lor1;
    }

    public void setLor2(Binary lor2) {
        this.lor2 = lor2;
    }

    public Binary getLor2() {
        return this.lor2;
    }
}

