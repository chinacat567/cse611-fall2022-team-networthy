package com.ub.networthy.payload.request;

import javax.validation.constraints.NotBlank;

import com.ub.networthy.models.ClientProfile;

public class LoginRequest {
	@NotBlank
	private String username;

	@NotBlank
	private String password;
	
	private ClientProfile clientProfile;

	public ClientProfile getClientProfile() {
		return clientProfile;
	}

	public void setClientProfile(ClientProfile clientProfile) {
		this.clientProfile = clientProfile;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
