package com.ub.networthy.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;

@Document(collection = "coachclientrelation")
public class ClientAndCoachRelation {

    @Id
    @NotBlank
    private
    String clientUserId;

    @NotBlank
    private
    String coachUserId;

    public ClientAndCoachRelation() {
    }

    public ClientAndCoachRelation(String clientUserId, String coachUserId) {
        this.clientUserId = clientUserId;
        this.coachUserId = coachUserId;
    }

    public String getClientUserId() {
        return this.clientUserId;
    }

    public void setClientUserId(String clientUserId) {
        this.clientUserId = clientUserId;
    }

    public String getCoachUserId() {
        return this.coachUserId;
    }

    public void setCoachUserId(String coachUserId) {
        this.coachUserId = coachUserId;
    }
}


