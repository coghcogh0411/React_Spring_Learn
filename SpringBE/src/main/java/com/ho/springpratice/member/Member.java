package com.ho.springpratice.member;

public class Member {
	private String id;
	private String password;
	private String name;
	private String provider;
	private String provider_id;

	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String id, String password, String name, String provider, String provider_id) {
		super();
		this.id = id;
		this.password = password;
		this.name = name;
		this.provider = provider;
		this.provider_id = provider_id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public String getProvider_id() {
		return provider_id;
	}

	public void setProvider_id(String provider_id) {
		this.provider_id = provider_id;
	}

}
