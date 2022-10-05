package com.ub.networthy.models;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jdk.jfr.BooleanFlag;

@Document(collection = "users")
public class User {
  @Id
  private String id;

  @Field("UPS_USER_ID")
  @NotBlank
  @Size(max = 20)
  private String username;

  @Field("UPS_EMAIL")
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @Field("UPS_PASSWORD")
  @NotBlank
  @Size(max = 120)
  private String password;

  @Field("UPS_ROLES")
  @DBRef
  private Set<Role> roles = new HashSet<>();
  
  @Field("UPS_IS_VERIFIED")
  @NotBlank
  @BooleanFlag
  private boolean isVerified;

  public boolean isVerified() {
	return isVerified;
}

public void setVerified(boolean isVerified) {
	this.isVerified = isVerified;
}

public User() {
  }

  public User(String username, String email, String password, boolean isVerified) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.isVerified = isVerified;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
}
