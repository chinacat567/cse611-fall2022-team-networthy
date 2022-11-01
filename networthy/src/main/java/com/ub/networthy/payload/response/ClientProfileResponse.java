package com.ub.networthy.payload.response;

import com.ub.networthy.models.ClientAndCoachRelation;
import com.ub.networthy.models.ClientProfile;

public class ClientProfileResponse {

	private ClientProfile clientProfile;
	
	private ClientAndCoachRelation clientCoachRelation;
	
	

	public ClientProfileResponse(ClientProfile clientProfile, ClientAndCoachRelation clientCoachRelation) {
		this.clientProfile = clientProfile;
		this.clientCoachRelation = clientCoachRelation;
	}

	public ClientProfile getClientProfile() {
		return clientProfile;
	}

	public void setClientProfile(ClientProfile clientProfile) {
		this.clientProfile = clientProfile;
	}

	public ClientAndCoachRelation getClientCoachRelation() {
		return clientCoachRelation;
	}

	public void setClientCoachRelation(ClientAndCoachRelation clientCoachRelation) {
		this.clientCoachRelation = clientCoachRelation;
	}
	
	
}
