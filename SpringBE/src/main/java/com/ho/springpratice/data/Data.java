package com.ho.springpratice.data;

public class Data {
	private String data_Title;
	private String data_Name;
	private String data_Option;
	public Data() {
		// TODO Auto-generated constructor stub
	}
	public Data(String data_Title, String data_Name, String data_Option) {
		super();
		this.data_Title = data_Title;
		this.data_Name = data_Name;
		this.data_Option = data_Option;
	}
	public String getData_Title() {
		return data_Title;
	}
	public void setData_Title(String data_Title) {
		this.data_Title = data_Title;
	}
	public String getData_Name() {
		return data_Name;
	}
	public void setData_Name(String data_Name) {
		this.data_Name = data_Name;
	}
	public String getData_Option() {
		return data_Option;
	}
	public void setData_Option(String data_Option) {
		this.data_Option = data_Option;
	}
}
