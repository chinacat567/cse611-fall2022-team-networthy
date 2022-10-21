package com.ub.networthy.repository;


import com.ub.networthy.models.ClientGoal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import javax.validation.constraints.NotBlank;
import java.util.List;


@EnableMongoRepositories
public interface ClientGoalRepository extends MongoRepository<ClientGoal, String> {

    List<ClientGoal> findAllByClientUsername(@NotBlank String clientUsername);

    List<ClientGoal> findAllByGoalReviewCoachId(@NotBlank String goalReviewCoachId);

    List<ClientGoal> findAll();

    void deleteClientGoalByGoalId(@NotBlank String goalId);
    
    ClientGoal findByGoalId(String goalId);
}
