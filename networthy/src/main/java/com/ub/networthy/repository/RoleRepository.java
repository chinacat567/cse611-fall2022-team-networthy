package com.ub.networthy.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ub.networthy.models.ERole;
import com.ub.networthy.models.Role;

@EnableMongoRepositories
public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
  Optional<Role> findFirstByName(ERole roleCoach);
}
