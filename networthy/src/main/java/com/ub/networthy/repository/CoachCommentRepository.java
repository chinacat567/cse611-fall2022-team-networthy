package com.ub.networthy.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ub.networthy.models.CoachComment;

@EnableMongoRepositories
public interface CoachCommentRepository extends MongoRepository<CoachComment, String> {

	List<CoachComment> findAllByCoachId(String coachId);
}
