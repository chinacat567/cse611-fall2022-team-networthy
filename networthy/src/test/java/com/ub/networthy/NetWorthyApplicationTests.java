package com.ub.networthy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ub.networthy.models.*;
import com.ub.networthy.payload.request.CoachDataRequest;
import com.ub.networthy.payload.request.SignupRequest;
import com.ub.networthy.repository.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

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
	private ClientAndCoachRelationRepository clientAndCoachRelationRepository;

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

	@Test
	public void testAddCoachForClientHappyCase() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add Client and Coach to Repo */
		ClientProfile clientProfile = new ClientProfile("testUsernameCCRClient1", "testEmailClientCoach@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		CoachProfile coachProfile = new CoachProfile("testUsernameCCRCoach1", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		clientProfileRepository.save(clientProfile);
		coachProfileRepository.save(coachProfile);

		mockMvc.perform(post("http://localhost:" + port + "/api/clientAndCoach/add/{coachId}/{clientId}", "testUsernameCCRCoach1","testUsernameCCRClient1")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isOk())
						.andExpect(content().string(containsString("ClientCoach Relation Added Successfully!")));

		ClientAndCoachRelation expectedClientCoachRelation = new ClientAndCoachRelation("testUsernameCCRClient1", "testUsernameCCRCoach1");

		/* Read CCR from DB */
		Optional<ClientAndCoachRelation> clientCoachRelation = clientAndCoachRelationRepository.findFirstByClientUsername("testUsernameCCRClient1");
		assertEquals(objectMapper.writeValueAsString(expectedClientCoachRelation), objectMapper.writeValueAsString(clientCoachRelation));
	}

	@Test
	public void testAddCoachForClientWhenCoachDoesNotExists() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add Client and Coach to Repo */
		ClientProfile clientProfile = new ClientProfile("testUsernameCCRClient2", "testEmailClientCoach@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);
		
		clientProfileRepository.save(clientProfile);

		mockMvc.perform(post("http://localhost:" + port + "/api/clientAndCoach/add/{coachId}/{clientId}", "testUsernameCCRCoach2","testUsernameCCRClient2")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isBadRequest())
						.andExpect(content().string(containsString("Error: Coach/Client do not exist")));
	}

	@Test
	public void testAddCoachForClientWhenClientDoesNotExists() throws Exception {
		CoachProfile coachProfile = new CoachProfile("testUsernameCCRCoach3", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		coachProfileRepository.save(coachProfile);

		mockMvc.perform(post("http://localhost:" + port + "/api/clientAndCoach/add/{coachId}/{clientId}", "testUsernameCCRCoach3","testUsernameCCRClient3")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("Error: Coach/Client do not exist")));
	}

	@Test
	public void testAddCoachForClientWhenBothClientAndCoachDoNotExist() throws Exception {
		mockMvc.perform(post("http://localhost:" + port + "/api/clientAndCoach/add/{coachId}/{clientId}", "testUsernameCCRCoach4","testUsernameCCRClient4")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("Error: Coach/Client do not exist")));
	}

	@Test
	public void testGetCoachForClientHappyCase() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add Client  to Repo */
		ClientProfile clientProfile = new ClientProfile("testUsernameCCRClient5", "testEmailClientCoach@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		clientProfileRepository.save(clientProfile);
		/* Add coach to Repo */
		CoachProfile coachProfile = new CoachProfile("testUsernameCCRCoach5", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		coachProfileRepository.save(coachProfile);
		/* Add relation to Repo */
		ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation("testUsernameCCRClient5", "testUsernameCCRCoach5");

		clientAndCoachRelationRepository.save(clientAndCoachRelation);
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/coach/{clientId}", "testUsernameCCRClient5")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(objectMapper.writeValueAsString(coachProfile)));
	}
	@Test
	public void testGetCoachForClientWhenClientDoesNotExistsButRelationAndCoachExists() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add coach to Repo */
		CoachProfile coachProfile = new CoachProfile("testUsernameCCRCoach6", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		coachProfileRepository.save(coachProfile);
		/* Add relation to Repo */
		ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation("testUsernameCCRClient6", "testUsernameCCRCoach6");

		clientAndCoachRelationRepository.save(clientAndCoachRelation);
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/coach/{clientId}", "testUsernameCCRClient6")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("Error: Client does not exist")));
	}

	@Test
	public void testGetCoachForClientWhenClientAndCoachDoNotExistButRelationExists() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add relation to Repo */
		ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation("testUsernameCCRClient7", "testUsernameCCRCoach7");
		clientAndCoachRelationRepository.save(clientAndCoachRelation);
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/coach/{clientId}", "testUsernameCCRClient7")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("Error: Client does not exist")));
	}

	@Test
	public void testGetCoachForClientWhenClientHasNoCoach() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add Client  to Repo */
		ClientProfile clientProfile = new ClientProfile("testUsernameCCRClient8", "testEmailClientCoach@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		clientProfileRepository.save(clientProfile);
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/coach/{clientId}", "testUsernameCCRClient8")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isNoContent());
	}

	@Test
	public void testGetCoachForClientWhenRelationExistsButCoachDoesNot() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add Client  to Repo */
		ClientProfile clientProfile = new ClientProfile("testUsernameCCRClient9", "testEmailClientCoach@domain.com",
				"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
				"testEducation", "testUniversity", "testLocation",
				10 , "testLearningMethod", "testSecondaryLearningMethod",
				"testIncome", "testDebt", "testGeneral", true);

		clientProfileRepository.save(clientProfile);
		/* Add relation to Repo */
		ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation("testUsernameCCRClient9", "testUsernameCCRCoach9");
		clientAndCoachRelationRepository.save(clientAndCoachRelation);
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/coach/{clientId}", "testUsernameCCRClient9")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isNoContent());
	}

    @Test
    public void testGetAllClientsForCoachHappyCase() throws Exception {
        /* Add roles */
        addRolesToRepo();
		/* Add coach to Repo */
		CoachProfile coachProfile = new CoachProfile("testUsernameCCRCoach10", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		coachProfileRepository.save(coachProfile);

        List<ClientProfile> expectedClientProfiles = new ArrayList<>();
		/* Add 3 test Clients to Repo */
        for (int i = 0; i < 3 ; i ++) {
            String testUsername = "testUsername" + i + "CCRClient10";

            ClientProfile clientProfile = new ClientProfile(testUsername, "testEmailClientCoach@domain.com",
                    "firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
                    "testEducation", "testUniversity", "testLocation",
                    10 , "testLearningMethod", "testSecondaryLearningMethod",
                    "testIncome", "testDebt", "testGeneral", true);

			expectedClientProfiles.add(clientProfile);

			ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation(testUsername, "testUsernameCCRCoach10");

            clientProfileRepository.save(clientProfile);
			clientAndCoachRelationRepository.save(clientAndCoachRelation);
        }
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/clients/{coachId}", "testUsernameCCRCoach10")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isOk())
						.andExpect(content().string(objectMapper.writeValueAsString(expectedClientProfiles)));
    }

	@Test
	public void testGetAllClientsForCoachWhenCoachDoesNotExistsButClientsAndCCRDo() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add 3 test Clients to Repo */
		for (int i = 0; i < 3 ; i ++) {
			String testUsername = "testUsername" + i + "CCRClient11";

			ClientProfile clientProfile = new ClientProfile(testUsername, "testEmailClientCoach@domain.com",
					"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
					"testEducation", "testUniversity", "testLocation",
					10 , "testLearningMethod", "testSecondaryLearningMethod",
					"testIncome", "testDebt", "testGeneral", true);


			ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation(testUsername, "testUsernameCCRCoach11");

			clientProfileRepository.save(clientProfile);
			clientAndCoachRelationRepository.save(clientAndCoachRelation);
		}
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/clients/{coachId}", "testUsernameCCRCoach11")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isBadRequest());
	}

	@Test
	public void testGetAllClientsForCoachWhenCoachDoesNotExistsAndOnlyClientsExists() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add 3 test Clients to Repo */
		for (int i = 0; i < 3 ; i ++) {
			String testUsername = "testUsername" + i + "CCRClient12";

			ClientProfile clientProfile = new ClientProfile(testUsername, "testEmailClientCoach@domain.com",
					"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
					"testEducation", "testUniversity", "testLocation",
					10 , "testLearningMethod", "testSecondaryLearningMethod",
					"testIncome", "testDebt", "testGeneral", true);

			clientProfileRepository.save(clientProfile);
		}
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/clients/{coachId}", "testUsernameCCRCoach12")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isBadRequest());
	}

	@Test
	public void testGetAllClientsForCoachWhenNothingExists() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/clients/{coachId}", "testUsernameCCRCoach13")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isBadRequest());
	}

	@Test
	public void testGetAllClientsForCoachWhenCCRExistsButClientDoesNot() throws Exception {
		/* Add roles */
		addRolesToRepo();
		/* Add coach to Repo */
		CoachProfile coachProfile = new CoachProfile("testUsernameCCRCoach14", "testEmailCoachRead@domain.com",
				"firstName", "lastName", new Date(12101994),
				"testGender", "testOccupation", "testEducation",
				"testUniversity", "testLocation", "testCredentials",
				true, "testGeneral", "testCalendlyLink");

		coachProfileRepository.save(coachProfile);

		List<ClientProfile> expectedClientProfiles = new ArrayList<>();
		boolean skipped = false;
		/* Add 3 test Clients to Repo  */
		for (int i = 0; i < 3 ; i ++) {
			String testUsername = "testUsername" + i + "CCRClient14";

			ClientProfile clientProfile = new ClientProfile(testUsername, "testEmailClientCoach@domain.com",
					"firstName", "lastName", new Date(12101994), "testGender", "testOccupation",
					"testEducation", "testUniversity", "testLocation",
					10 , "testLearningMethod", "testSecondaryLearningMethod",
					"testIncome", "testDebt", "testGeneral", true);

			ClientAndCoachRelation clientAndCoachRelation = new ClientAndCoachRelation(testUsername, "testUsernameCCRCoach14");
			clientAndCoachRelationRepository.save(clientAndCoachRelation);
			/* Skip creating 1 ClientProfile */
			if (!skipped) {
				skipped = true;
				continue;
			}
			clientProfileRepository.save(clientProfile);
			expectedClientProfiles.add(clientProfile);
		}

		/* Hit API */
		mockMvc.perform(get("http://localhost:" + port + "/api/clientAndCoach/get/clients/{coachId}", "testUsernameCCRCoach14")
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isOk())
						.andExpect(content().string(objectMapper.writeValueAsString(expectedClientProfiles)));

	}



	@Test
	public void testSignUpWhenUserAlreadyExists() {


	}

	@Test
	public void testSignUpHappyCase() {

	}

	@Test
	public void testSignInHappyCase() {

	}

	@Test
	public void testSignInWhenUserDoesNotExists() {

	}

}
