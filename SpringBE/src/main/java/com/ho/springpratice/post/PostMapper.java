package com.ho.springpratice.post;

import java.math.BigDecimal;
import java.util.List;

public interface PostMapper {
	public abstract int regPost(Post p);
	public abstract List<Post> getPost(Paging pg);
	public abstract Post getPostDetail(BigDecimal no);
	public abstract int regPostReply(PostReply pr);
	public abstract List<PostReply> getPostReply(BigDecimal no);
}
