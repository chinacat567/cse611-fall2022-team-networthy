package com.ub.networthy.controllers;

//import org.hibernate.validator.internal.util.logging.Log_.logger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.payload.request.ClientProfileRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.CoachProfileRepository;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/admin")
public class AdminController
{
	@Autowired
	private ClientProfileRepository clientProfileRepository;
	
	@Autowired
	CoachProfileRepository coachProfileRepository;

	Logger logger = LoggerFactory.getLogger(ClientController.class);


	@PutMapping("/edit/clientProfile")
	public ResponseEntity<?> editClientProfile(@RequestBody ClientProfileRequest clientProfileRequest) {
		
		ClientProfile existingClientProfile = clientProfileRepository.findByUsername(clientProfileRequest.getUsername());

		if(existingClientProfile == null) {
			logger.error("Error: Client Profile doesnot exist for - " +clientProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}
		
		//cannot change the username, email id and user type

		if(!clientProfileRequest.getFirstName().equals(existingClientProfile.getFirstName())) existingClientProfile.setFirstName(clientProfileRequest.getFirstName());
		if(!clientProfileRequest.getLastName().equals(existingClientProfile.getLastName())) existingClientProfile.setLastName(clientProfileRequest.getLastName());
		if(!clientProfileRequest.getDateOfBirth().equals(existingClientProfile.getDateOfBirth())) existingClientProfile.setDateOfBirth(clientProfileRequest.getDateOfBirth());
		if(!clientProfileRequest.getGender().equals(existingClientProfile.getGender())) existingClientProfile.setGender(clientProfileRequest.getGender());
		if(!clientProfileRequest.getOccupation().equals(existingClientProfile.getOccupation())) existingClientProfile.setOccupation(clientProfileRequest.getOccupation());
		if(!clientProfileRequest.getEducation().equals(existingClientProfile.getEducation())) existingClientProfile.setEducation(clientProfileRequest.getEducation());
		if(!clientProfileRequest.getUniversity().equals(existingClientProfile.getUniversity())) existingClientProfile.setUniversity(clientProfileRequest.getUniversity());
		if(!clientProfileRequest.getLocation().equals(existingClientProfile.getLocation())) existingClientProfile.setLocation(clientProfileRequest.getLocation());
		if(clientProfileRequest.getFinancialLevel() != existingClientProfile.getFinancialLevel()) existingClientProfile.setFinancialLevel(clientProfileRequest.getFinancialLevel());
		if(!clientProfileRequest.getLearningMethod().equals(existingClientProfile.getLearningMethod())) existingClientProfile.setLearningMethod(clientProfileRequest.getLearningMethod());
		if(clientProfileRequest.getIncome() != existingClientProfile.getIncome()) existingClientProfile.setIncome(clientProfileRequest.getIncome());
		if(clientProfileRequest.getDebt() != existingClientProfile.getDebt()) existingClientProfile.setDebt(clientProfileRequest.getDebt());
		if(!clientProfileRequest.getGeneral().equals(existingClientProfile.getGeneral())) existingClientProfile.setGeneral(clientProfileRequest.getGeneral());
		
		clientProfileRepository.save(existingClientProfile);
		
		
		return ResponseEntity.ok(new MessageResponse("Client Profile Updated Successfully"));
		
	}
	
	
	@PutMapping("/edit/coachProfile")
	public ResponseEntity<?> editCoachProfile(CoachProfile coachProfileRequest) {
		
		System.out.println("Coach user name "+coachProfileRequest.getUsername());
		try {

			Optional<CoachProfile> existingCoachProfile = coachProfileRepository.findById(coachProfileRequest.getUsername());

			if(existingCoachProfile.isEmpty()) {
				logger.error("Error: Coach Profile does not exist for - " +coachProfileRequest.getUsername());
				return ResponseEntity
						.badRequest()
						.body(new MessageResponse("Error: User Does Not Exist"));
			}

			if(!coachProfileRequest.getFirstName().equals(existingCoachProfile.get().getFirstName())) existingCoachProfile.get().setFirstName(coachProfileRequest.getFirstName());
			if(!coachProfileRequest.getLastName().equals(existingCoachProfile.get().getLastName())) existingCoachProfile.get().setLastName(coachProfileRequest.getLastName());
			if(coachProfileRequest.getDateOfBirth()!= null) existingCoachProfile.get().setDateOfBirth(coachProfileRequest.getDateOfBirth());
			if(!coachProfileRequest.getGender().equals(existingCoachProfile.get().getGender())) existingCoachProfile.get().setGender(coachProfileRequest.getGender());
			if(!coachProfileRequest.getOccupation().equals(existingCoachProfile.get().getOccupation())) existingCoachProfile.get().setOccupation(coachProfileRequest.getOccupation());
			if(!coachProfileRequest.getEducation().equals(existingCoachProfile.get().getEducation())) existingCoachProfile.get().setEducation(coachProfileRequest.getEducation());
			if(!coachProfileRequest.getUniversity().equals(existingCoachProfile.get().getUniversity())) existingCoachProfile.get().setUniversity(coachProfileRequest.getUniversity());
			if(!coachProfileRequest.getLocation().equals(existingCoachProfile.get().getLocation())) existingCoachProfile.get().setLocation(coachProfileRequest.getLocation());
			if(!coachProfileRequest.getCredentials().equals(existingCoachProfile.get().getCredentials())) existingCoachProfile.get().setCredentials(coachProfileRequest.getCredentials());

			coachProfileRepository.save(existingCoachProfile.get());

			return ResponseEntity.ok(new MessageResponse("Coach Profile Updated Successfully"));
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Error: Failed to read Coach Profile for - " +coachProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Failed to read Data"));

		}


	}
	
	@DeleteMapping("/remove/coachProfile/{userId}")
	public ResponseEntity<?> deleteCoachProfile(@PathVariable String userId)
	{

		Optional<CoachProfile> existingCoachProfile = coachProfileRepository.findById(userId);

		if(existingCoachProfile.isEmpty()) {
			logger.error("Error: Coach Profile doesnot exist for - " +userId);
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}

		coachProfileRepository.deleteById(userId);

		return ResponseEntity.ok(new MessageResponse("Coach Profile Deleted Successfully"));
	}
	
	@DeleteMapping("/remove/clientProfile/{userId}")
	public ResponseEntity<?> deleteClientProfile(@PathVariable String userId)
	{
		
		ClientProfile existingClientProfile = clientProfileRepository.findByUsername(userId);
		
		if(existingClientProfile == null) {
			logger.error("Error: Client Profile doesnot exist for - " +userId);
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}
		
		clientProfileRepository.deleteById(userId);
		
		return ResponseEntity.ok(new MessageResponse("Client Profile Deleted Successfully"));
	}
	
	
	@PutMapping("/edit/coachProfile/{userId}")
	public ResponseEntity<?> approveCoachProfile(@PathVariable String userId)
	{
		Optional<CoachProfile> existingCoachProfile = coachProfileRepository.findById(userId);
		
		if(existingCoachProfile.isEmpty()) {
			logger.error("Error: Coach Profile doesnot exist for - " +userId);
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}
		
		existingCoachProfile.get().setProfileStatus(true);
		
		coachProfileRepository.save(existingCoachProfile.get());
		
		return ResponseEntity.ok(new MessageResponse("Coach Profile Approved Successfully"));
	}
	
	
}
	