package com.ub.networthy.services;


import com.ub.networthy.models.ClientGoal;
import com.ub.networthy.payload.request.ClientGoalRequest;
import com.ub.networthy.repository.ClientGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientGoalService {

    @Autowired
    private ClientGoalRepository clientGoalRepo;

    @Transactional
    public void addGoalForClient(@NotNull ClientGoalRequest clientGoalRequest) {
        /* set GoalId to a randomly generated 128 bit UUID */
        clientGoalRequest.setGoalId(UUID.randomUUID().toString());

        ClientGoal clientGoal = new ClientGoal(clientGoalRequest.getClientId(), clientGoalRequest.getGoalId(),
                                               clientGoalRequest.getGoalStatus(), clientGoalRequest.getGoalReviewCoachId(),
                                               clientGoalRequest.getGoalTittle(), clientGoalRequest.getGoalDescription(),
                                               clientGoalRequest.getGoalSpecific(), clientGoalRequest.getGoalMeasurable(),
                                               clientGoalRequest.getGoalAttainable(), clientGoalRequest.getGoalRelevant(),
                                               clientGoalRequest.getGoalTimeBased(), clientGoalRequest.getGoalTags());

        clientGoalRepo.save(clientGoal);

    }

    public void updateGoalStatus(@NotBlank String clientId, @NotBlank String updatedStatus) {
        Optional<ClientGoal> clientGoal = clientGoalRepo.findAllByClientId(clientId).stream().findFirst();

        if (clientGoal.isPresent()) {
            ClientGoal clientGoalOld = clientGoal.get();
            ClientGoal updatedClientGoal = new ClientGoal(clientGoalOld.getClientId(), clientGoalOld.getGoalId(),
                                                          updatedStatus, clientGoalOld.getGoalReviewCoachId(),
                                                          clientGoalOld.getGoalTittle(), clientGoalOld.getGoalDescription(),
                                                          clientGoalOld.getGoalSpecific(), clientGoalOld.getGoalMeasurable(),
                                                          clientGoalOld.getGoalAttainable(), clientGoalOld.getGoalRelevant(),
                                                          clientGoalOld.getGoalTimeBased(), clientGoalOld.getGoalTags());
            clientGoalRepo.save(updatedClientGoal);
        }
        else {
            throw new UsernameNotFoundException(clientId);
        }

    }

    public void addTagsForGoal(@NotBlank String clientId, @NotNull List<String> newTags) {
        Optional<ClientGoal> clientGoal = clientGoalRepo.findAllByClientId(clientId).stream().findFirst();
        if (clientGoal.isPresent()) {

            ClientGoal clientGoalOld = clientGoal.get();
            List<String> updatedTags = new ArrayList<>(clientGoalOld.getGoalTags());
            updatedTags.addAll(newTags);

            ClientGoal updatedClientGoal = new ClientGoal(clientGoalOld.getClientId(), clientGoalOld.getGoalId(),
                    clientGoalOld.getGoalStatus(), clientGoalOld.getGoalReviewCoachId(),
                    clientGoalOld.getGoalTittle(), clientGoalOld.getGoalDescription(),
                    clientGoalOld.getGoalSpecific(), clientGoalOld.getGoalMeasurable(),
                    clientGoalOld.getGoalAttainable(), clientGoalOld.getGoalRelevant(),
                    clientGoalOld.getGoalTimeBased(), updatedTags);

            clientGoalRepo.save(updatedClientGoal);
        }
        else {
            throw new UsernameNotFoundException(clientId);
        }
    }
}
