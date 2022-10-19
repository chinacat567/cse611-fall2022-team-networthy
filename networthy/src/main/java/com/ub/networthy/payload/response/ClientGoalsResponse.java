package com.ub.networthy.payload.response;

import java.util.List;

import com.ub.networthy.models.ClientGoal;

public class ClientGoalsResponse {

	private String clientUsername;
	
	private List<ClientGoal> goalList;
	
	

	public ClientGoalsResponse(String clientUsername, List<ClientGoal> goalList) {
		this.clientUsername = clientUsername;
		this.goalList = goalList;
	}

	public String getClientUsername() {
		return clientUsername;
	}

	public void setClientUsername(String clientUsername) {
		this.clientUsername = clientUsername;
	}

	public List<ClientGoal> getGoalList() {
		return goalList;
	}

	public void setGoalList(List<ClientGoal> goalList) {
		this.goalList = goalList;
	}
	
	
}
