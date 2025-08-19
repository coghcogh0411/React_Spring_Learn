package com.ho.springpratice.post;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ho.springpratice.JwtUtil;
import com.ho.springpratice.member.Member;
import com.ho.springpratice.member.MemberMapper;

import io.jsonwebtoken.Claims;

@Service
public class PostDAO {
	@Autowired
	private SqlSession ss;
	
	//게시글 등록
	public void regPost(Post p, String token) {
		String userToken = token.replace("Bearer ", "");
		Claims claims = JwtUtil.validateToken(userToken);
		String writerId = claims.getSubject();
		Member writer = ss.getMapper(MemberMapper.class).getMemberName(writerId);
		p.setPost_Writer(writer.getName());
		
		if(ss.getMapper(PostMapper.class).regPost(p)==1) {
		}
		
	}
	//게시글 가져오기
	public List<Post> getPost(int offset, int pageSize) {
		Paging pg = new Paging(offset, pageSize);
		List<Post> posts = ss.getMapper(PostMapper.class).getPost(pg);
		return posts;
	}
	//상세 게시글 가져오기
	public Post getPostDetail(BigDecimal no) {
		Post postDetail = ss.getMapper(PostMapper.class).getPostDetail(no);
		return postDetail;
	}
	
	//댓글쓰기
	public void regPostReply(BigDecimal no, PostReply pr, String token) {
		String userToken = token.replace("Bearer ", "");
		Claims claims = JwtUtil.validateToken(userToken);
		String writerId = claims.getSubject();
		Member writer = ss.getMapper(MemberMapper.class).getMemberName(writerId);
		pr.setReply_Writer(writer.getName());
		pr.setReply_Post_No(no);
		if(ss.getMapper(PostMapper.class).regPostReply(pr)==1) {
		}
		
	}
	//댓글 가져오기
	public List<PostReply> getPostReply(BigDecimal no) {
		List<PostReply> postReply = ss.getMapper(PostMapper.class).getPostReply(no);
		return postReply;
	}
}
