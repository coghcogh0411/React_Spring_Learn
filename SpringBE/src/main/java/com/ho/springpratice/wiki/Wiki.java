package com.ho.springpratice.wiki;

public class Wiki {
	private String wiki_Title;
	private String wiki_Content;
	public Wiki() {
		// TODO Auto-generated constructor stub
	}
	public String getWiki_Title() {
		return wiki_Title;
	}
	public void setWiki_Title(String wiki_Title) {
		this.wiki_Title = wiki_Title;
	}
	public String getWiki_Content() {
		return wiki_Content;
	}
	public void setWiki_Content(String wiki_Content) {
		this.wiki_Content = wiki_Content;
	}
	public Wiki(String wiki_Title, String wiki_Content) {
		super();
		this.wiki_Title = wiki_Title;
		this.wiki_Content = wiki_Content;
	}
}
