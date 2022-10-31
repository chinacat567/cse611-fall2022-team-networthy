package com.ub.networthy.payload.request;
import javax.validation.constraints.NotBlank;


public class PersonalizedContentRequest
{
	@NotBlank
	private String personalizedContentID;

	@NotBlank
	private String tag;
	
	@NotBlank
	private String pcTitle;
	
	@NotBlank
	private String pcDescription;
	
	@NotBlank
	private String pcAuthor;

	@NotBlank
	private String pcLink;

	@NotBlank
	private String pcType;
	


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