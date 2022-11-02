package com.ub.networthy.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ub.networthy.models.Tags;

public interface TagsRepository extends MongoRepository<Tags, String> {
	
	boolean existsByName(String name);
}
