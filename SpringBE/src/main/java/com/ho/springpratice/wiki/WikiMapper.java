package com.ho.springpratice.wiki;

import java.util.List;

public interface WikiMapper {
	public abstract int regWikiTitle(WikiTitle wikiTitle);
	public abstract List<String> getWikiTitle();
}
