package com.ub.networthy.payload.request;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class ClientGoalRequest {

    @NotBlank
    private String clientId;

    @NotBlank
    private String goalId;

    @NotBlank
    private String goalStatus;

    @NotBlank
    private String goalReviewCoachId;

    @NotBlank
    private String goalTittle;

    @NotBlank
    private String goalDescription;

    @NotBlank
    private String goalSpecific;

    @NotBlank
    private String goalMeasurable;

    @NotBlank
    private String goalAttainable;

    @NotBlank
    private String goalRelevant;

    @NotBlank
    private String goalTimeBased;

    @NotBlank
    private List<String> goalTags;

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

    public String getGoalStatus() {
        return goalStatus;
    }

    public void setGoalStatus(String goalStatus) {
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

    public String getGoalRelevant() {
        return goalRelevant;
    }

    public void setGoalRelevant(String goalRelevant) {
        this.goalRelevant = goalRelevant;
    }
}
