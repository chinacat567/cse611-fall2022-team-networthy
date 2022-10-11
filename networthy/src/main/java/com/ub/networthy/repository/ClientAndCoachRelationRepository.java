package com.ub.networthy.repository;


import com.ub.networthy.models.ClientAndCoachRelation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import javax.validation.constraints.NotBlank;
import java.util.List;


@EnableMongoRepositories
public interface ClientAndCoachRelationRepository extends MongoRepository<ClientAndCoachRelation, String> {

    List<ClientAndCoachRelation> findAllByClientUserId(@NotBlank String clientUserId);

    List<ClientAndCoachRelation> findAllByCoachUserId(@NotBlank String coachUserId);

    boolean existsByClientUserId(@NotBlank String username);

    List<ClientAndCoachRelation> findAll();

    void deleteClientAndCoachRelationByClientUserIdAndCoachUserId(@NotBlank String clientUserId, @NotBlank String coachUserId);
}
