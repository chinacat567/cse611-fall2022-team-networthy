package com.ub.networthy.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "*", maxAge = 3600)
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
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> editClientProfile(@RequestBody ClientProfileRequest clientProfileRequest) {
		
		ClientProfile existingClientProfile = clientProfileRepository.findByUsername(clientProfileRequest.getUsername());
		
		if(existingClientProfile == null) {
			logger.error("Error: Client Profile doesnot exist for - " +clientProfileRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}
		//TO-DO : Update All POJOS
		existingClientProfile.setDateOfBirth(clientProfileRequest.getDateOfBirth());
				
		clientProfileRepository.save(existingClientProfile);
		return ResponseEntity.ok(new MessageResponse("Client Profile Updated Successfully"));
		
	}
}
