package com.ho.springpratice.post;

import java.math.BigDecimal;
import java.util.Date;

public class Post {
	private BigDecimal postNo;
	private String postTitle;
	private String postContent;
	private Date postDate;
	private String postWriter;
	public Post() {
		// TODO Auto-generated constructor stub
	}
	public Post(BigDecimal postNo, String postTitle, String postContent, Date postDate, String postWriter) {
		super();
		this.postNo = postNo;
		this.postTitle = postTitle;
		this.postContent = postContent;
		this.postDate = postDate;
		this.postWriter = postWriter;
	}
	public BigDecimal getPostNo() {
		return postNo;
	}
	public void setPostNo(BigDecimal postNo) {
		this.postNo = postNo;
	}
	public String getPostTitle() {
		return postTitle;
	}
	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}
	public String getPostContent() {
		return postContent;
	}
	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}
	public Date getPostDate() {
		return postDate;
	}
	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}
	public String getPostWriter() {
		return postWriter;
	}
	public void setPostWriter(String postWriter) {
		this.postWriter = postWriter;
	}
}
