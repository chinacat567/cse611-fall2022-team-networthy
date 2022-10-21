package com.ub.networthy.models;


import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JacksonAnnotation;
import com.fasterxml.jackson.annotation.JsonFormat;


@Document(collection = "clientgoal")
public class ClientGoal {

	@Id
    @NotBlank
    private String goalId;
    
    @Field("GOL_CLIENT")
    @NotBlank
    private String clientUsername;

    @Field("GOL_STATUS")
    @NotBlank
    private GoalStatus goalStatus;

	@Field("GOL_REVIEW_COA")
    @NotBlank
    private String goalReviewCoachId;

    @Field("GOL_TITTLE")
    @NotBlank
    private String goalTittle;

    @Field("GOL_DESC")
    @NotBlank
    private String goalDescription;

    @Field("GOL_S")
    @NotBlank
    private String goalSpecific;

    @Field("GOL_M")
    @NotBlank
    private String goalMeasurable;

    @Field("GOL_A")
    @NotBlank
    private String goalAttainable;

    @Field("GOL_R")
    @NotBlank
    private String goalRelevant;

    @Field("GOL_T")
    @NotBlank
    private String goalTimeBased;

    @Field("GOL_TAGS")
    @NotBlank
    private List<String> goalTags;

    public ClientGoal(@NotBlank String clientUsername, @NotBlank String goalId, @NotBlank GoalStatus goalStatus,
                      @NotBlank String goalReviewCoachId, @NotBlank String goalTittle, @NotBlank String goalDescription,
                      @NotBlank String goalSpecific, @NotBlank String goalMeasurable, @NotBlank String goalAttainable,
                      @NotBlank String goalRelevant, @NotBlank String goalTimeBased, @NotBlank List<String> goalTags) {

        this.clientUsername = clientUsername;
        this.goalId = goalId;
        this.goalStatus = goalStatus;
        this.goalReviewCoachId = goalReviewCoachId;
        this.goalTittle = goalTittle;
        this.goalDescription = goalDescription;
        this.goalSpecific = goalSpecific;
        this.goalMeasurable = goalMeasurable;
        this.goalAttainable = goalAttainable;
        this.goalRelevant = goalRelevant;
        this.goalTimeBased = goalTimeBased;
        this.goalTags = goalTags;
    }

    public String getClientUsername() {
		return clientUsername;
	}

	public void setClientUsername(String clientUsername) {
		this.clientUsername = clientUsername;
	}

    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
        this.goalId = goalId;
    }

    public GoalStatus getGoalStatus() {
        return goalStatus;
    }

    public void setGoalStatus(GoalStatus goalStatus) {
        this.goalStatus = goalStatus;
    }

    public String getGoalReviewCoachId() {
        return goalReviewCoachId;
    }

    public void setGoalReviewCoachId(String goalReviewCoachId) {
        this.goalReviewCoachId = goalReviewCoachId;
    }

    public String getGoalTittle() {
        return goalTittle;
    }

    public void setGoalTittle(String goalTittle) {
        this.goalTittle = goalTittle;
    }

    public String getGoalDescription() {
        return goalDescription;
    }

    public void setGoalDescription(String goalDescription) {
        this.goalDescription = goalDescription;
    }

    public String getGoalSpecific() {
        return goalSpecific;
    }

    public void setGoalSpecific(String goalSpecific) {
        this.goalSpecific = goalSpecific;
    }

    public String getGoalMeasurable() {
        return goalMeasurable;
    }

    public void setGoalMeasurable(String goalMeasurable) {
        this.goalMeasurable = goalMeasurable;
    }

    public String getGoalAttainable() {
        return goalAttainable;
    }

    public void setGoalAttainable(String goalAttainable) {
        this.goalAttainable = goalAttainable;
    }

    public String getGoalRelevant() {
        return goalRelevant;
    }

    public void setGoalRelevant(String goalRelevant) {
        this.goalRelevant = goalRelevant;
    }

    public String getGoalTimeBased() {
        return goalTimeBased;
    }

    public void setGoalTimeBased(String goalTimeBased) {
        this.goalTimeBased = goalTimeBased;
    }

    public List<String> getGoalTags() {
        return goalTags;
    }

    public void setGoalTags(List<String> goalTags) {
        this.goalTags = goalTags;
    }
}
