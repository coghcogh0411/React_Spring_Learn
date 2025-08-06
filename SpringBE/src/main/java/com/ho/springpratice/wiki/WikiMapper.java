package com.ho.springpratice.wiki;

import java.util.List;

public interface WikiMapper {
	public abstract int regWikiTitle(WikiTitle wikiTitle);
	public abstract List<String> getWikiTitles();
	public abstract Wiki getWikiContent(String wikiTitle);
	public abstract int regWikiContent(Wiki wiki);
	public abstract int updWikiContent(Wiki wiki);
}
