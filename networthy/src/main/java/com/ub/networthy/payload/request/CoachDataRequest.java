package com.ub.networthy.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.Binary;

import java.sql.Date;

import javax.validation.constraints.NotBlank;

public class CoachDataRequest {

	@NotBlank
	private String username;

	@NotBlank
	private String emailId;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@NotBlank
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	private Date dateOfBirth;

	@NotBlank
	private String gender;

	@NotBlank
	private String occupation;

	@NotBlank
	private String education;

	@NotBlank
	private String university;

	@NotBlank
	private String location;

	private String credentials;

	@NotBlank
	private boolean profileStatus;
	
	@NotBlank
	private String general;

	public CoachDataRequest(@NotBlank String username, @NotBlank String emailId, @NotBlank String firstName,
							@NotBlank String lastName, @NotBlank Date dateOfBirth, @NotBlank String gender,
							@NotBlank String occupation, @NotBlank String education, @NotBlank String university,
							@NotBlank String location, String credentials, @NotBlank boolean profileStatus, @NotBlank String general) {
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
	}

	public CoachDataRequest() {

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

	public String getCredentials() {
		return credentials;
	}

	public void setCredentials(String credentials) {
		this.credentials = credentials;
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

}
