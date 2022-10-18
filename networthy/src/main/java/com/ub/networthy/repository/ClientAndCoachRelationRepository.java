package com.ub.networthy.repository;


import com.ub.networthy.models.ClientAndCoachRelation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;


@EnableMongoRepositories
public interface ClientAndCoachRelationRepository extends MongoRepository<ClientAndCoachRelation, String> {

    Optional<ClientAndCoachRelation> findFirstByClientUsername(@NotBlank String clientUsername);

    List<ClientAndCoachRelation> findAllByCoachUsername(@NotBlank String coachUsername);

    boolean existsByClientUsername(@NotBlank String username);

    boolean existsByClientUsernameAndCoachUsername(@NotBlank String clientUsername,
                                                   @NotBlank String coachUsername);

    List<ClientAndCoachRelation> findAll();

    void deleteClientAndCoachRelationByClientUsernameAndCoachUsername(@NotBlank String clientUsername,
                                                                      @NotBlank String coachUsername);
}
