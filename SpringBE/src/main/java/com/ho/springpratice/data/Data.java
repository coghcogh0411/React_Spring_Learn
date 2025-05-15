package com.ho.springpratice.data;

public class Data {
	private String data_Title;
	private String data_File;
	private String data_Option;
	public Data() {
		// TODO Auto-generated constructor stub
	}
	public String getData_Title() {
		return data_Title;
	}
	public void setData_Title(String data_Title) {
		this.data_Title = data_Title;
	}
	public String getData_File() {
		return data_File;
	}
	public void setData_File(String data_File) {
		this.data_File = data_File;
	}
	public String getData_Option() {
		return data_Option;
	}
	public void setData_Option(String data_Option) {
		this.data_Option = data_Option;
	}
	public Data(String data_Title, String data_File, String data_Option) {
		super();
		this.data_Title = data_Title;
		this.data_File = data_File;
		this.data_Option = data_Option;
	}
	
}
