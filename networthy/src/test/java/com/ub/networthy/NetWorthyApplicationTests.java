package com.ub.networthy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ub.networthy.models.*;
import com.ub.networthy.payload.request.CoachDataRequest;
import com.ub.networthy.payload.request.SignupRequest;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.CoachProfileRepository;
import com.ub.networthy.repository.RoleRepository;
import com.ub.networthy.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc()
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class NetWorthyApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private CoachProfileRepository coachProfileRepository;

	@Autowired
	private ClientProfileRepository clientProfileRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	ObjectMapper objectMapper;

	boolean initialized;

	private void addRolesToRepo() {
		if (!initialized) {
			for (ERole role : ERole.values()) {
				roleRepository.save(new Role(role));
			}
			initialized = true;
		}
	}

	@Test
	public void testCreateCoachHappyCase() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Sign Up */
		SignupRequest signUpRequest = new SignupRequest("testUsernameCoach", "testEmailCoach@domain.com",
														Collections.singleton("ROLE_COACH"), "testPassword");

		mockMvc.perform(post("http://localhost:" + port + "/api/auth/signup")
				.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(signUpRequest)))
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("User registered successfully!")));

		/* Verify email */
		mockMvc.perform(get("http://localhost:" + port + "/api/auth/verify/{userId}", "testUsernameCoach")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isOk());

		/* Add coach profile */
		CoachDataRequest coachDataRequest = new CoachDataRequest("testUsernameCoach", "testEmailCoach@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		mockMvc.perform(post("http://localhost:" + port + "/api/coach/add/data")
						.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(coachDataRequest)))
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("Coach Data Added Successfully!")));

		/* Read Coach Profile from DB */
		Optional<CoachProfile> coachData = coachProfileRepository.findByUsername("testUsernameCoach");
		assertEquals(objectMapper.writeValueAsString(coachDataRequest), objectMapper.writeValueAsString(coachData));
	}

	@Test
	public void testCreateClientProfileHappyCase() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Sign Up */
		SignupRequest signUpRequest = new SignupRequest("testUsernameClient", "testEmailClient@domain.com",
				Collections.singleton("ROLE_CLIENT"), "testPassword");

		mockMvc.perform(post("http://localhost:" + port + "/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(signUpRequest)))
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("User registered successfully!")));

		/* Verify email */
		mockMvc.perform(get("http://localhost:" + port + "/api/auth/verify/{userId}", "testUsernameClient")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

		/* Add client profile */
		ClientProfile clientProfileRequest = new ClientProfile("testUsernameClient", "testEmailClient@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		mockMvc.perform(post("http://localhost:" + port + "/api/client/add/clientProfile")
						.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(clientProfileRequest)))
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("Client Profile Updated Successfully")));

		/* Read Coach Profile from DB */
		ClientProfile clientProfileData = clientProfileRepository.findByUsername("testUsernameClient");
		assertEquals(objectMapper.writeValueAsString(clientProfileData), objectMapper.writeValueAsString(clientProfileData));
	}

	@Test
	public void testCreateClientProfileWhenLoggedInAsCoach() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Sign Up */
		SignupRequest signUpRequest = new SignupRequest("testUsernameInvalid", "testUsernameInvalid@domain.com",
				Collections.singleton("ROLE_COACH"), "testPassword");

		mockMvc.perform(post("http://localhost:" + port + "/api/auth/signup")
						.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(signUpRequest)))
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("User registered successfully!")));

		/* Verify email */
		mockMvc.perform(get("http://localhost:" + port + "/api/auth/verify/{userId}", "testUsernameInvalid")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

		/* Add client profile */
		ClientProfile clientProfileRequest = new ClientProfile("testUsernameInvalid", "testUsernameInvalid@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		mockMvc.perform(post("http://localhost:" + port + "/api/client/add/clientProfile")
						.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(clientProfileRequest)))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("Error: User not authorized for client profile!")));

	}

	@Test
	public void testReadCoachProfileHappyCase() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add user to DB */
		userRepository.save(new User("testUsernameCoachRead", "testEmailCoachRead@domain.com", "password", true));
		/* Add Client Profile to DB */
		CoachProfile coachProfile = new CoachProfile("testUsernameCoachRead", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		coachProfileRepository.save(coachProfile);

		mockMvc.perform(get("http://localhost:" + port + "/api/coach/get/profile/{username}",
						"testUsernameCoachRead").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(objectMapper.writeValueAsString(coachProfile)));

	}

	@Test
	public void testReadClientProfileHappyCase() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add user to DB */
		userRepository.save(new User("testUsernameClientRead", "testEmailClientRead@domain.com", "password", true));
		/* Add Client Profile to DB */
		ClientProfile clientProfile = new ClientProfile("testUsernameClientRead", "testEmailClientRead@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		clientProfileRepository.save(clientProfile);

		mockMvc.perform(get("http://localhost:" + port + "/api/client/getProfile/{clientId}", "testUsernameClientRead").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(objectMapper.writeValueAsString(clientProfile)));

	}

	@Test
	public void testReadClientProfileWhenClientDoesNotExists() throws Exception {
		/* Add roles */
		addRolesToRepo();
		mockMvc.perform(get("http://localhost:" + port + "/api/client/getProfile/{clientId}", "testUsernameNonExistingClientRead")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(""));
	}
}
