package com.ub.networthy.services;

import com.ub.networthy.models.ClientAndCoachRelation;
import com.ub.networthy.models.ClientProfile;
import com.ub.networthy.models.CoachProfile;
import com.ub.networthy.repository.ClientAndCoachRelationRepository;
import com.ub.networthy.repository.ClientProfileRepository;
import com.ub.networthy.repository.CoachProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientCoachRelationService {

    @Autowired
    private ClientAndCoachRelationRepository clientCoachRelationRepo;

    @Autowired
    private CoachProfileRepository coachProfileRepo;

    @Autowired
    private ClientProfileRepository clientProfileRepo;

    public void addCoachForClient(String clientId, String coachId) {
        ClientAndCoachRelation clientCoachRelation = new ClientAndCoachRelation(clientId, coachId);
        clientCoachRelationRepo.save(clientCoachRelation);
    }

    public List<CoachProfile> getAllCoachesForClient(String clientId) {
        List<CoachProfile> coachProfiles;
        coachProfiles = clientCoachRelationRepo.findAllByClientUserId(clientId).stream()
                                               .map(a -> coachProfileRepo.findByUsername(a.getCoachUserId()))
                                               .collect(Collectors.toList());

        return coachProfiles;
    }

    public List<ClientProfile> getAllClientsForCoach(String coachId) {
        List<ClientProfile> clientProfiles;
        clientProfiles = clientCoachRelationRepo.findAllByCoachUserId(coachId).stream()
                                                .map(a -> clientProfileRepo.findByUsername(a.getClientUserId()))
                                                .collect(Collectors.toList());
        return clientProfiles;
    }

    public void deleteClientCoachRelation(String clientId, String coachId) {
        clientCoachRelationRepo.deleteClientAndCoachRelationByClientUserIdAndCoachUserId(clientId, coachId);
    }
}
