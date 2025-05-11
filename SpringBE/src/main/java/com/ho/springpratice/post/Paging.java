package com.ho.springpratice.post;

public class Paging {
	private int offset;
	private int pageSize;
	public Paging() {
		// TODO Auto-generated constructor stub
	}
	public Paging(int offset, int pageSize) {
		super();
		this.offset = offset;
		this.pageSize = pageSize;
	}
	public int getOffset() {
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
}
