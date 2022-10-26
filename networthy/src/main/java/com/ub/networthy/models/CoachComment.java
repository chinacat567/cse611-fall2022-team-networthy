package com.ub.networthy.models;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonFormat;

@Document(collection = "coachcomments")
public class CoachComment {

    @Id
    private String id;

    @Field("CCM_COACH_ID")
    @NotBlank
    private String coachId;
    
    @Field("CCM_CLIENT_ID")
    @NotBlank
    private String clientId;
    
    @Field("CCM_GOAL_ID")
    @NotBlank
    private String goalId;
    
    @Field("CCM_GOAL_TITLE")
    @NotBlank
    private String goalTitle;
    
    @Field("CCM_COM_DATE")
	@NotBlank
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	private Date commentDate;
    
    @Field("CCM_COA_COMMENT")
    @NotBlank
    private String comment;

    
	public CoachComment(String id, @NotBlank String coachId, @NotBlank String clientId, @NotBlank String goalId,
			@NotBlank String goalTitle, @NotBlank Date commentDate, @NotBlank String comment) {
		this.id = id;
		this.coachId = coachId;
		this.clientId = clientId;
		this.goalId = goalId;
		this.goalTitle = goalTitle;
		this.commentDate = commentDate;
		this.comment = comment;
	}

	public String getId() {
		return id;
	}

	
	public void setId(String id) {
		this.id = id;
	}	 

	public String getCoachId() {
		return coachId;
	}

	public void setCoachId(String coachId) {
		this.coachId = coachId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getGoalId() {
		return goalId;
	}

	public void setGoalId(String clientGoal) {
		this.goalId = clientGoal;
	}

	public String getGoalTitle() {
		return goalTitle;
	}

	public void setGoalTitle(String goalTitle) {
		this.goalTitle = goalTitle;
	}

	public Date getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
    
    
    
    
    
    
}
