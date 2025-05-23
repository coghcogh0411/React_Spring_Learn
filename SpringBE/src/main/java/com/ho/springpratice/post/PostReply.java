package com.ho.springpratice.post;

import java.math.BigDecimal;
import java.util.Date;

public class PostReply {
	private BigDecimal reply_No;
	private BigDecimal reply_Post_No;
	private String reply_Writer;
	private String reply_Content;
	private Date reply_Date;
	public PostReply() {
		// TODO Auto-generated constructor stub
	}
	public PostReply(BigDecimal reply_No, BigDecimal reply_Post_No, String reply_Writer, String reply_Content,
			Date reply_Date) {
		super();
		this.reply_No = reply_No;
		this.reply_Post_No = reply_Post_No;
		this.reply_Writer = reply_Writer;
		this.reply_Content = reply_Content;
		this.reply_Date = reply_Date;
	}
	public BigDecimal getReply_No() {
		return reply_No;
	}
	public void setReply_No(BigDecimal reply_No) {
		this.reply_No = reply_No;
	}
	public BigDecimal getReply_Post_No() {
		return reply_Post_No;
	}
	public void setReply_Post_No(BigDecimal reply_Post_No) {
		this.reply_Post_No = reply_Post_No;
	}
	public String getReply_Writer() {
		return reply_Writer;
	}
	public void setReply_Writer(String reply_Writer) {
		this.reply_Writer = reply_Writer;
	}
	public String getReply_Content() {
		return reply_Content;
	}
	public void setReply_Content(String reply_Content) {
		this.reply_Content = reply_Content;
	}
	public Date getReply_Date() {
		return reply_Date;
	}
	public void setReply_Date(Date reply_Date) {
		this.reply_Date = reply_Date;
	}
	
}
