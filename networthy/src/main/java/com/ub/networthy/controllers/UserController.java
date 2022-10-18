package com.ub.networthy.controllers;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ub.networthy.models.ERole;
import com.ub.networthy.models.Role;
import com.ub.networthy.models.User;
import com.ub.networthy.payload.request.SignupRequest;
import com.ub.networthy.payload.request.UserChangePasswordRequest;
import com.ub.networthy.payload.response.MessageResponse;
import com.ub.networthy.repository.UserRepository;


@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@PostMapping("/changePassword")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserChangePasswordRequest userChangePasswordRequest) {
		
		if (!userRepository.existsByUsername(userChangePasswordRequest.getUsername())) {
			logger.error("Error : Username does not exist! " + userChangePasswordRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username does not exist!"));
		}

		User user = userRepository.findByUsername(userChangePasswordRequest.getUsername()).get();
		
		if(!user.getPassword().equals(userChangePasswordRequest.getOldPassword())) {
			logger.error("Error : Password Does not match -  " + userChangePasswordRequest.getUsername());
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Incorrect Old Password!"));
		}
		
		user.setPassword(userChangePasswordRequest.getNewPassword());
		userRepository.save(user);
		logger.info("Success : Password Updated Successfully" + userChangePasswordRequest.getUsername());
		return ResponseEntity.ok(new MessageResponse("Password Updated Successfully"));
	}
	
}
