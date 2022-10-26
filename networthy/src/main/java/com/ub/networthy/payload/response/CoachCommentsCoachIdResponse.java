package com.ub.networthy.payload.response;

import java.util.List;

import com.ub.networthy.models.CoachComment;

public class CoachCommentsCoachIdResponse {

	private String coachId;
	
	private List<CoachComment> coachComments;

	public CoachCommentsCoachIdResponse(String coachId, List<CoachComment> coachComments) {
		this.coachId = coachId;
		this.coachComments = coachComments;
	}

	public String getCoachId() {
		return coachId;
	}

	public void setCoachId(String coachId) {
		this.coachId = coachId;
	}

	public List<CoachComment> getCoachComments() {
		return coachComments;
	}

	public void setCoachComments(List<CoachComment> coachComments) {
		this.coachComments = coachComments;
	}
	
	
	
	
}
