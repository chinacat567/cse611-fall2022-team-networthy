package com.ub.networthy.repository;

import java.util.List;

import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ub.networthy.models.PersonalizedContent;

@EnableMongoRepositories
public interface PersonalizedContentRepository extends MongoRepository<PersonalizedContent, String> {
	
	List<PersonalizedContent> findAllByTag(@NotBlank String tagId);
	
}