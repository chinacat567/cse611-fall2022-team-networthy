package com.ub.networthy.payload.request;

import java.sql.Date;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class ClientProfileRequest {

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
		
		@Field("CLI_LERNING_METHOD")
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
		
		

		public String getUsername() {
			return username;
		}

		public void setUsername(String userId) {
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
