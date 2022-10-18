package com.ub.networthy.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;

@Document(collection = "clientcoachrelation")
public class ClientAndCoachRelation {

    @Id
    private String id;

    @Field("CCR_CLIENT_ID")
    @NotBlank
    private
    String clientUsername;

    @Field("CCR_COACH_ID")
    @NotBlank
    private
    String coachUsername;

    public ClientAndCoachRelation() {
    }

    public ClientAndCoachRelation(String clientUsername, String coachUsername) {
        this.clientUsername = clientUsername;
        this.coachUsername = coachUsername;
    }

    public String getClientUsername() {
        return this.clientUsername;
    }

    public void setClientUsername(String clientUsername) {
        this.clientUsername = clientUsername;
    }

    public String getCoachUserId() {
        return this.coachUsername;
    }

    public void setCoachUserId(String coachUsername) {
        this.coachUsername = coachUsername;
    }
}


