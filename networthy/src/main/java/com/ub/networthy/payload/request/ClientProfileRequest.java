package com.ub.networthy.payload.request;

import java.sql.Date;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class ClientProfileRequest {

	@NotBlank
	private String username;

	@NotBlank
	private String emailId;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@NotBlank
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

	@NotBlank
	private int financialLevel;

	@NotBlank
	private String learningMethod;

	@NotBlank
	private String income;

	@NotBlank
	private String debt;

	@NotBlank
	private String general;

	@NotBlank
	private boolean profileStatus;

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

	public String getIncome() {
		return income;
	}

	public void setIncome(String income) {
		this.income = income;
	}

	public String getDebt() {
		return debt;
	}

	public void setDebt(String debt) {
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
