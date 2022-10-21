package com.ub.networthy.payload.request;

import com.ub.networthy.models.GoalStatus;

public class GoalStatusChangeRequest {

	private String clientId;
	
	private String goalId;
	
	private GoalStatus updatedStatus;

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getGoalId() {
		return goalId;
	}

	public void setGoalId(String goalId) {
		this.goalId = goalId;
	}

	public GoalStatus getUpdatedStatus() {
		return updatedStatus;
	}

	public void setUpdatedStatus(GoalStatus updatedStatus) {
		this.updatedStatus = updatedStatus;
	}
	
	
}
