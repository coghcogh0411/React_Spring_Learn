package com.ho.springpratice.post;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostDAO {
	@Autowired
	private SqlSession ss;
	
	//게시글 등록
	public void regPost(Post p) {
		if(ss.getMapper(PostMapper.class).regPost(p)==1) {
		}
		
	}
	//게시글 가져오기
	public List<Post> getPost() {
		List<Post> posts = ss.getMapper(PostMapper.class).getPost();
		return posts;
	}
}
