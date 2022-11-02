package com.ub.networthy.models;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "content")
public class PersonalizedContent
{
	@Field("PCO_NUM")
	@NotBlank
	private int contentNumber;

	@Field("PCO_TAG")
	@NotBlank
	private String tag;
	
	@Field("PCO_TITLE")
	@NotBlank
	private String title;
	
	@Field("PCO_DESC")
	@NotBlank
	private String description;
	
	@Field("PCO_AUTHOR")
	@NotBlank
	private String pcAuthor;

	@Field("PCO_LINK")
	@NotBlank
	private String pcLink;

	@Field("PCO_METHOD")
	@NotBlank
	private String learningMethod;
	
	@Field("PCO_LENGTH")
	@NotBlank
	private String length;

	public PersonalizedContent(@NotBlank int contentNumber, @NotBlank String tag, @NotBlank String title,
			@NotBlank String description, @NotBlank String pcAuthor, @NotBlank String pcLink,
			@NotBlank String learningMethod, @NotBlank String length) {
		this.contentNumber = contentNumber;
		this.tag = tag;
		this.title = title;
		this.description = description;
		this.pcAuthor = pcAuthor;
		this.pcLink = pcLink;
		this.learningMethod = learningMethod;
		this.length = length;
	}

	public int getContentNumber() {
		return contentNumber;
	}

	public void setContentNumber(int contentNumber) {
		this.contentNumber = contentNumber;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPcAuthor() {
		return pcAuthor;
	}

	public void setPcAuthor(String pcAuthor) {
		this.pcAuthor = pcAuthor;
	}

	public String getPcLink() {
		return pcLink;
	}

	public void setPcLink(String pcLink) {
		this.pcLink = pcLink;
	}

	public String getLearningMethod() {
		return learningMethod;
	}

	public void setLearningMethod(String learningMethod) {
		this.learningMethod = learningMethod;
	}

	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}
	
	
	

	
}