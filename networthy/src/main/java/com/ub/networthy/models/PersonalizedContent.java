package com.ub.networthy.models;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "personalizedcontent")
public class PersonalizedContent
{
	@Id
	@Field("PC_ID")
	@NotBlank
	private String personalizedContentID;

	@Field("PC_TAG")
	@NotBlank
	private String tag;
	
	@Field("PC_TITLE")
	@NotBlank
	private String pcTitle;
	
	@Field("PC_DESCRIPTION")
	@NotBlank
	private String pcDescription;
	
	@Field("PC_AUTHOR")
	@NotBlank
	private String pcAuthor;

	@Field("PC_LINK")
	@NotBlank
	private String pcLink;

	@Field("PC_TYPE")
	@NotBlank
	private String pcType;
	

	public PersonalizedContent(@NotBlank String personalizedContentID,
			@NotBlank String tag, @NotBlank String pcTitle, @NotBlank String pcDescription, @NotBlank String pcAuthor,
			@NotBlank String pcLink, @NotBlank String pcType) {
		super();
		this.personalizedContentID = personalizedContentID;
		this.tag = tag;
		this.pcTitle = pcTitle;
		this.pcDescription = pcDescription;
		this.pcAuthor = pcAuthor;
		this.pcLink = pcLink;
		this.pcType = pcType;
	}

	public String getPersonalizedContentID() {
		return personalizedContentID;
	}

	public void setPersonalizedContentID(String personalizedContentID) {
		this.personalizedContentID = personalizedContentID;
	}

	public String getPcTag() {
		return tag;
	}

	public void setPcTag(String pcTag) {
		this.tag = pcTag;
	}

	public String getPcTitle() {
		return pcTitle;
	}

	public void setPcTitle(String pcTitle) {
		this.pcTitle = pcTitle;
	}

	public String getPcDescription() {
		return pcDescription;
	}

	public void setPcDescription(String pcDescription) {
		this.pcDescription = pcDescription;
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

	public String getPcType() {
		return pcType;
	}

	public void setPcType(String pcType) {
		this.pcType = pcType;
	}

	
}