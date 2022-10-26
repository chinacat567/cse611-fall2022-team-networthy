package com.ub.networthy.controllers;

//import org.hibernate.validator.internal.util.logging.Log_.logger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.models.ClientAndCoachRelation;
import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.models.ERole;
import com.ub.networthy.models.Role;
import com.ub.networthy.models.User;
import com.ub.networthy.payload.request.ClientProfileRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.ClientAndCoachRelationRepository;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.CoachProfileRepository;
import com.ub.networthy.repository.UserRepository;

import io.swagger.annotations.Api;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Api(tags = "Admin APIs")
@RestController
@RequestMapping(value = "/api/admin")
public class AdminController
{
	@Autowired
	private ClientProfileRepository clientProfileRepository;
	
	@Autowired
	CoachProfileRepository coachProfileRepository;
	

    @Autowired
    private ClientAndCoachRelationRepository clientCoachRelationRepo;
	
	@Autowired
	ClientController clientController;
	
    @Autowired
    private UserRepository userRepository;

	Logger logger = LoggerFactory.getLogger(ClientController.class);


	@PutMapping("/edit/clientProfile")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<?> editClientProfile(@RequestBody ClientProfileRequest clientProfileRequest) {
		
		return clientController.editClientProfile(clientProfileRequest);
				
	}
	
	
	@PutMapping("/edit/coachProfile")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<?> editCoachProfile(CoachProfile coachProfileRequest) {
		
		if (!authN(coachProfileRequest.getUsername(), ERole.ROLE_COACH)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not authorized to edit coach profile!"));
        }
		
		try {
			

			Optional<CoachProfile> existingCoachProfile = coachProfileRepository.findByUsername(coachProfileRequest.getUsername());

			if(existingCoachProfile.isEmpty()) {
				logger.error("Error: Coach Profile does not exist for - " +coachProfileRequest.getUsername());
				return ResponseEntity
						.badRequest()
						.body(new MessageResponse("Error: User Does Not Exist"));
			}
			
			

			if(coachProfileRequest.getFirstName() != null) existingCoachProfile.get().setFirstName(coachProfileRequest.getFirstName());
			if(coachProfileRequest.getLastName() != null) existingCoachProfile.get().setLastName(coachProfileRequest.getLastName());
			if(coachProfileRequest.getDateOfBirth() != null) existingCoachProfile.get().setDateOfBirth(coachProfileRequest.getDateOfBirth());
			if(coachProfileRequest.getGender() != null) existingCoachProfile.get().setGender(coachProfileRequest.getGender());
			if(coachProfileRequest.getOccupation() != null) existingCoachProfile.get().setOccupation(coachProfileRequest.getOccupation());
			if(coachProfileRequest.getEducation() != null) existingCoachProfile.get().setEducation(coachProfileRequest.getEducation());
			if(coachProfileRequest.getUniversity() != null) existingCoachProfile.get().setUniversity(coachProfileRequest.getUniversity());
			if(coachProfileRequest.getLocation() != null) existingCoachProfile.get().setLocation(coachProfileRequest.getLocation());
			if(coachProfileRequest.getCredentials() != null) existingCoachProfile.get().setCredentials(coachProfileRequest.getCredentials());

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
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<?> deleteCoachProfile(@PathVariable String userId)
	{

		if (!authN(userId, ERole.ROLE_COACH)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not authorized to delete coach profile!"));
        }
		
		Optional<CoachProfile> existingCoachProfile = coachProfileRepository.findByUsername(userId);

		if(existingCoachProfile.isEmpty()) {
			logger.error("Error: Coach Profile doesnot exist for - " +userId);
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}

		//Removing client coach relations before removing coach
		
		List<ClientAndCoachRelation> clientAndCoachRelations  = clientCoachRelationRepo.findAllByCoachUsername(userId);
		
		if(!clientAndCoachRelations.isEmpty())
		{
			for(ClientAndCoachRelation clientAndCoachRelation : clientAndCoachRelations)
			{
				String clientId = clientAndCoachRelation.getClientUsername();
				
				clientCoachRelationRepo.deleteClientAndCoachRelationByClientUsernameAndCoachUsername(clientId, userId);
			}
		}
		
		coachProfileRepository.deleteById(userId);

		return ResponseEntity.ok(new MessageResponse("Coach Profile Deleted Successfully"));
	}
	
	@DeleteMapping("/remove/clientProfile/{userId}")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<?> deleteClientProfile(@PathVariable String userId)
	{
		
		if (!authN(userId, ERole.ROLE_CLIENT)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not authorized to delete client profile!"));
        }
		
		ClientProfile existingClientProfile = clientProfileRepository.findByUsername(userId);
		
		if(existingClientProfile == null) {
			logger.error("Error: Client Profile doesnot exist for - " +userId);
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User Does Not Exist"));
		}
		

		//Removing client coach relation before removing client
		
        Optional<ClientAndCoachRelation> clientAndCoachRelation = clientCoachRelationRepo.findFirstByClientUsername(userId);
        
        if (clientAndCoachRelation.isPresent()) {
        	
        	String coachId = clientAndCoachRelation.get().getCoachUserId();
        	
        	clientCoachRelationRepo.deleteClientAndCoachRelationByClientUsernameAndCoachUsername(userId, coachId);	

        }
		
		clientProfileRepository.deleteById(userId);
		
		return ResponseEntity.ok(new MessageResponse("Client Profile Deleted Successfully"));
	}
	
	
	@PutMapping("/coachProfile/approve/{userId}/{status}")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<?> approveCoachProfile(@PathVariable String userId)
	{
		
		if (!authN(userId, ERole.ROLE_COACH)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: User not authorized to approve coach profile!"));
        }

		
		Optional<CoachProfile> existingCoachProfile = coachProfileRepository.findByUsername(userId);
		
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
	
    private boolean authN(String username, ERole eRole) {
        try {
            if(!userRepository.existsByUsername(username)) {
                logger.error("Error: User Does Not Exist! - " + username);
                return false;
            }
            User user = userRepository.findByUsername(username).orElse(null);
            if (user == null) {
                return false;
            }
            Set<Role> roles = user.getRoles();
            boolean validRole = false;
            for(Role role : roles) {
                if(role.getName().equals(eRole)) {
                    validRole = true;
                    break;
                }
            }
            if (!validRole) {
                logger.error("Error: User not authorized for coach profile - " + username);
            }
            return validRole;
        } catch (Exception e) {
            return false;
        }
    }
	
	
	
}
	