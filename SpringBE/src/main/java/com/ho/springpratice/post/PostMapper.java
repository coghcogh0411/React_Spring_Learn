package com.ho.springpratice.post;

import java.util.List;

public interface PostMapper {
	public abstract int regPost(Post p);
	public abstract List<Post> getPost();
}
