package com.ub.networthy.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/* payload without the PDF files */
public class CoachProfileRequest {

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
        private String credentials;

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
}
