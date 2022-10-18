package com.ub.networthy.utils;

import com.ub.networthy.controllers.AuthController;
import com.ub.networthy.controllers.ClientCoachRelationController;
import com.ub.networthy.controllers.ClientController;
import com.ub.networthy.models.ERole;
import com.ub.networthy.models.Role;
import com.ub.networthy.models.User;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.CoachProfileRepository;
import com.ub.networthy.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Component
public class Utils {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientProfileRepository clientProfileRepository;

    @Autowired
    private CoachProfileRepository coachProfileRepository;

    /*TO DO : Unable to see Util logs from Controller */
    private Logger logger = LoggerFactory.getLogger(ClientCoachRelationController.class);

    public Utils() {
    }

    public boolean validateRole(String username, ERole eRole) {
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

    public boolean coachExists(@NotBlank String coachId) {
        boolean coachExists;
        try {
            coachExists = coachProfileRepository.existsByUsername(coachId);
            return coachExists;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Client Data for clientId " + coachId);
            return false;
        }
    }

    public boolean clientExists(@NotBlank String clientId) {
        boolean clientExists;
        try {
            clientExists = clientProfileRepository.existsByUsername(clientId);
            return clientExists;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error: Failed to Get Client Data for clientId " + clientId);
            return false;
        }
    }
}
