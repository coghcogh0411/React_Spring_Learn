package com.ho.springpratice.post;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.ho.springpratice.member.Member;

public class Post {
	private BigDecimal post_No;
	private String post_Title;
	private String post_Content;
	private String post_Writer;
	private Date post_Date;
	private List<PostReply> post_Reply;

	public Post() {
		// TODO Auto-generated constructor stub
	}

	public Post(BigDecimal post_No, String post_Title, String post_Content, String post_Writer, Date post_Date,
			List<PostReply> post_Reply) {
		super();
		this.post_No = post_No;
		this.post_Title = post_Title;
		this.post_Content = post_Content;
		this.post_Writer = post_Writer;
		this.post_Date = post_Date;
		this.post_Reply = post_Reply;
	}

	public BigDecimal getPost_No() {
		return post_No;
	}

	public void setPost_No(BigDecimal post_No) {
		this.post_No = post_No;
	}

	public String getPost_Title() {
		return post_Title;
	}

	public void setPost_Title(String post_Title) {
		this.post_Title = post_Title;
	}

	public String getPost_Content() {
		return post_Content;
	}

	public void setPost_Content(String post_Content) {
		this.post_Content = post_Content;
	}

	public String getPost_Writer() {
		return post_Writer;
	}

	public void setPost_Writer(String post_Writer) {
		this.post_Writer = post_Writer;
	}

	public Date getPost_Date() {
		return post_Date;
	}

	public void setPost_Date(Date post_Date) {
		this.post_Date = post_Date;
	}

	public List<PostReply> getPost_Reply() {
		return post_Reply;
	}

	public void setPost_Reply(List<PostReply> post_Reply) {
		this.post_Reply = post_Reply;
	}

}
