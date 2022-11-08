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
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
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
    
    @Field("COA_CALENDLY")
    @NotBlank
    private String calendlyLink;

    public CoachProfile() {

    }

    /* constructor for POSTING "application/json" */
    public CoachProfile(@NotBlank String username, @NotBlank String emailId, @NotBlank String firstName,
                        @NotBlank String lastName, @NotBlank Date dateOfBirth, @NotBlank String gender, @NotBlank String occupation,
                        @NotBlank String education, @NotBlank String university, @NotBlank String location, String credentials,
                        @NotBlank boolean profileStatus, @NotBlank String general, @NotBlank String calendlyLink) {
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
        this.general = general;
        this.calendlyLink = calendlyLink;
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

	public String getCalendlyLink()
	{
		return calendlyLink;
	}
	
	public void setCalendlyLink(String calendlyLink)
	{
		this.calendlyLink = calendlyLink;
	}

}

