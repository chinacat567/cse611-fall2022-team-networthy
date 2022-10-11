package com.ub.networthy.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ub.networthy.models.ClientProfile;
import java.util.List;

@EnableMongoRepositories
public interface ClientProfileRepository extends MongoRepository<ClientProfile, String> {

	ClientProfile findByUsername(String username);
	
	boolean existsByUsername(String username);
	
	List<ClientProfile> findAll();
}
