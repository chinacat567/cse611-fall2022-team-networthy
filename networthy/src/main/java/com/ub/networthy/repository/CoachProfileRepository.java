package com.ub.networthy.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ub.networthy.models.CoachProfile;

import java.util.List;


@EnableMongoRepositories
    public interface CoachProfileRepository extends MongoRepository<CoachProfile, String> {

    CoachProfile findByUsername(String username);

    boolean existsByUsername(String username);

    List<CoachProfile> findAll();
}
