package com.ub.networthy.models;

import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "tags")
public class Tags {

	
	@Field("TAG_NAME")
	@NotBlank
	private String name;

	public Tags(@NotBlank String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
