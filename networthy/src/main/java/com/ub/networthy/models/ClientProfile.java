package com.ub.networthy.models;


import java.util.Date;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JacksonAnnotation;
import com.fasterxml.jackson.annotation.JsonFormat;


@Document(collection = "clientprofile")
public class ClientProfile {

	@Id
	private String id;
	  
	@Field("CLI_CLIENT_ID")
	@NotBlank
	private String username;
	
	@Field("CLI_EMAIL")
	@NotBlank
	private String emailId;
	
	@Field("CLI_FIRST_NAME")
	@NotBlank
	private String firstName;
	
	@Field("CLI_LAST_NAME")
	@NotBlank
	private String lastName;
	
	@Field("CLI_DOB")
	@NotBlank
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	private Date dateOfBirth;
	
	@Field("CLI_GENDER")
	@NotBlank
	private String gender;
	
	@Field("CLI_OCCUPATION")
	@NotBlank
	private String occupation;
	
	@Field("CLI_EDUCATION")
	@NotBlank
	private String education;
	
	@Field("CLI_UNIVERSITY")
	@NotBlank
	private String university;
	
	@Field("CLI_LOCATION")
	@NotBlank
	private String location;
	
	@Field("CLI_FINANCIAL_LEVEL")
	@NotBlank
	private int financialLevel;
	
	@Field("CLI_LEARNING_METHOD")
	@NotBlank
	private String learningMethod;
	
	@Field("CLI_INCOME")
	@NotBlank
	private int income;
	
	@Field("CLI_DEBT")
	@NotBlank
	private int debt;
	
	@Field("CLI_GENERAL")
	@NotBlank
	private String general;
	
	@Field("CLI_PROFILE_STATUS")
	@NotBlank
	private boolean profileStatus;
	
	public ClientProfile() {
		
	}

	public ClientProfile(@NotBlank String userId, @NotBlank String emailId, @NotBlank String firstName,
			@NotBlank String lastName, @NotBlank Date dateOfBirth, @NotBlank String gender, @NotBlank String occupation,
			@NotBlank String education, @NotBlank String university, @NotBlank String location,
			@NotBlank int financialLevel, @NotBlank String learningMethod, @NotBlank int income, @NotBlank int debt,
			@NotBlank String general, @NotBlank boolean profileStatus) {
		super();
		this.username = userId;
		this.emailId = emailId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.occupation = occupation;
		this.education = education;
		this.university = university;
		this.location = location;
		this.financialLevel = financialLevel;
		this.learningMethod = learningMethod;
		this.income = income;
		this.debt = debt;
		this.general = general;
		this.profileStatus = profileStatus;
	}

	public String getUsername() {
		return username;
	}

	/*
	 * public void setUserId(String userId) { this.userId = userId; }
	 */

	public String getEmailId() {
		return emailId;
	}

	/*
	 * public void setEmailId(String emailId) { this.emailId = emailId; }
	 */

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

	public int getFinancialLevel() {
		return financialLevel;
	}

	public void setFinancialLevel(int financialLevel) {
		this.financialLevel = financialLevel;
	}

	public String getLearningMethod() {
		return learningMethod;
	}

	public void setLearningMethod(String learningMethod) {
		this.learningMethod = learningMethod;
	}

	public int getIncome() {
		return income;
	}

	public void setIncome(int income) {
		this.income = income;
	}

	public int getDebt() {
		return debt;
	}

	public void setDebt(int debt) {
		this.debt = debt;
	}

	public String getGeneral() {
		return general;
	}

	public void setGeneral(String general) {
		this.general = general;
	}

	public boolean isProfileStatus() {
		return profileStatus;
	}

	public void setProfileStatus(boolean profileStatus) {
		this.profileStatus = profileStatus;
	}
	
	
}
