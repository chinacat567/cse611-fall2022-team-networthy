package com.ub.networthy.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.ERole;
import com.ub.networthy.models.Role;
import com.ub.networthy.models.User;
import com.ub.networthy.payload.request.ClientProfileRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.UserRepository;

import io.swagger.annotations.Api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Api(tags = "Client APIs")
@RestController
@RequestMapping("/api/client")
public class ClientController {
	
	@Autowired
	ClientProfileRepository clientProfileRepository;
	
	@Autowired
	UserRepository userRepository;
	
	Logger logger = LoggerFactory.getLogger(ClientController.class);

	/*
	 * @PostMapping("/add/clientProfile") public ResponseEntity<?>
	 * addClientProfile(@RequestBody ClientProfile clientProfileRequest) {
	 * 
	 * ClientProfile existingClientProfile =
	 * clientProfileRepository.findByUserId(clientProfileRequest.getUserId());
	 * 
	 * if(existingClientProfile != null) { return ResponseEntity .badRequest()
	 * .body(new MessageResponse("Error: Client Profile already exists!")); }
	 * 
	 * ClientProfile clientProfile = new
	 * ClientProfile(clientProfileRequest.getUserId(),
	 * clientProfileRequest.getEmailId(), clientProfileRequest.getFirstName(),
	 * clientProfileRequest.getLastName(), clientProfileRequest.getDateOfBirth(),
	 * clientProfileRequest.getGender(), clientProfileRequest.getOccupation(),
	 * clientProfileRequest.getEducation(), clientProfileRequest.getUniversity(),
	 * clientProfileRequest.getLocation(), clientProfileRequest.getFinancialLevel(),
	 * clientProfileRequest.getLearningMethod(), clientProfileRequest.getIncome(),
	 * clientProfileRequest.getDebt(), clientProfileRequest.getGeneral(),
	 * clientProfileRequest.isProfileStatus());
	 * 
	 * clientProfileRepository.save(clientProfile); return ResponseEntity.ok(new
	 * MessageResponse("Client Profile Created Successfully"));
	 * 
	 * }
	 */
	
	
	@PostMapping("/add/clientProfile")
	public ResponseEntity<?> addClientProfile(@RequestBody ClientProfile clientProfileRequest) {
		
		boolean validRole = false;

		if(!userRepository.existsByUsername(clientProfileRequest.getUsername())) {
			logger.error("Error: User Does Not Exist! - " +clientProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist!"));
		}
		
		if (clientProfileRepository.existsById(clientProfileRequest.getUsername())) {
			logger.error("Error: Client Profile for Username already exists! - " +clientProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Client Profile for Username already exists!"));
		}
		User user = userRepository.findByUsername(clientProfileRequest.getUsername()).get();
		Set<Role> roles = user.getRoles();
		
		for(Role role : roles) {
			if(role.getName().equals(ERole.ROLE_CLIENT)) {
				validRole = true;
				break;
			}
		}
		
		if(!validRole) {
			
			logger.error("Error: User not authorized for client profile - " +clientProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User not authorized for client profile!"));
		}
		
		ClientProfile clientProfile = new ClientProfile(clientProfileRequest.getUsername(),
				clientProfileRequest.getEmailId(), clientProfileRequest.getFirstName(),
				clientProfileRequest.getLastName(), clientProfileRequest.getDateOfBirth(),
				clientProfileRequest.getGender(), clientProfileRequest.getOccupation(),
				clientProfileRequest.getEducation(), clientProfileRequest.getUniversity(),
				clientProfileRequest.getLocation(), clientProfileRequest.getFinancialLevel(),
				clientProfileRequest.getLearningMethod(), clientProfileRequest.getIncome(),
				clientProfileRequest.getDebt(), clientProfileRequest.getGeneral(),
				clientProfileRequest.isProfileStatus());
				
		clientProfileRepository.save(clientProfile);
		logger.info("Success: Client Profile Created - " +clientProfileRequest.getUsername());
		return ResponseEntity.ok(new MessageResponse("Client Profile Updated Successfully"));
		
	}
	
	@PutMapping("/edit/clientProfile")
	public ResponseEntity<?> editClientProfile(@RequestBody ClientProfileRequest clientProfileRequest) {
		
		ClientProfile existingClientProfile = clientProfileRepository.findByUsername(clientProfileRequest.getUsername());
		
		if(existingClientProfile == null) {
			logger.error("Error: Client Profile doesnot exist for - " +clientProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}
		//Note :- Do not update Username, Email and Profile Status from the PUT call.
		// Username and email can never be changed.
		// Profile Status can only be set by Admin.
		if(clientProfileRequest.getFirstName() != null) existingClientProfile.setFirstName(clientProfileRequest.getFirstName());
		if(clientProfileRequest.getLastName() != null) existingClientProfile.setLastName(clientProfileRequest.getLastName());
		if(clientProfileRequest.getDateOfBirth() != null) existingClientProfile.setDateOfBirth(clientProfileRequest.getDateOfBirth());
		if(clientProfileRequest.getGender() != null) existingClientProfile.setGender(clientProfileRequest.getGender());
		if(clientProfileRequest.getOccupation() != null) existingClientProfile.setOccupation(clientProfileRequest.getOccupation());
		if(clientProfileRequest.getEducation() != null) existingClientProfile.setEducation(clientProfileRequest.getEducation());
		if(clientProfileRequest.getUniversity() != null) existingClientProfile.setUniversity(clientProfileRequest.getUniversity());
		if(clientProfileRequest.getLocation() != null) existingClientProfile.setLocation(clientProfileRequest.getLocation());
		if(clientProfileRequest.getFinancialLevel() != 0) existingClientProfile.setFinancialLevel(clientProfileRequest.getFinancialLevel());
		if(clientProfileRequest.getLearningMethod() != null) existingClientProfile.setLearningMethod(clientProfileRequest.getLearningMethod());
		if(clientProfileRequest.getIncome() != null) existingClientProfile.setIncome(clientProfileRequest.getIncome());
		if(clientProfileRequest.getDebt() != null) existingClientProfile.setDebt(clientProfileRequest.getDebt());
		if(clientProfileRequest.getGeneral() != null) existingClientProfile.setGeneral(clientProfileRequest.getGeneral());
		
		clientProfileRepository.save(existingClientProfile);
		return ResponseEntity.ok(new MessageResponse("Client Profile Updated Successfully"));
		
	}
	@GetMapping("/getAll")
	//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<ClientProfile> getAllClientProfile(){
		
		return clientProfileRepository.findAll();
	}
}
