package com.ub.networthy.payload.request;

import org.bson.types.Binary;

import javax.validation.constraints.NotNull;

public class CoachProfileRequest {

    @NotNull
    private CoachDataRequest coachData;

    @NotNull
    private Binary resume;

    @NotNull
    private Binary lor1;

    @NotNull
    private Binary lor2;

    public CoachProfileRequest(@NotNull CoachDataRequest coachData, @NotNull Binary resume, @NotNull Binary lor1, @NotNull Binary lor2) {
        this.coachData = coachData;
        this.resume = resume;
        this.lor1 = lor1;
        this.lor2 = lor2;
    }

    public CoachDataRequest getCoachData() {
        return coachData;
    }

    public void setCoachData(CoachDataRequest coachData) {
        this.coachData = coachData;
    }

    public Binary getResume() {
        return resume;
    }

    public void setResume(Binary resume) {
        this.resume = resume;
    }

    public Binary getLor1() {
        return lor1;
    }

    public void setLor1(Binary lor1) {
        this.lor1 = lor1;
    }

    public Binary getLor2() {
        return lor2;
    }

    public void setLor2(Binary lor2) {
        this.lor2 = lor2;
    }
}
