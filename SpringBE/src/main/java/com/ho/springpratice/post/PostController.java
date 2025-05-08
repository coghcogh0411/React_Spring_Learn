package com.ho.springpratice.post;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PostController {
	@Autowired
	private PostDAO pDAO;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "api/post/reg", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> regPost(@RequestBody Post p){
		try {
			pDAO.regPost(p);
			System.out.println("성공");
			return new ResponseEntity<String>("게시글 등록 성공",HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("게시글 등록 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "api/post/get", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getPost(){
		try {
			List<Post> posts = pDAO.getPost();
			System.out.println(posts);
			return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("게시글 조회 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "api/post/{no}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getPost(@PathVariable BigDecimal no){
		Post postDetail = pDAO.getPostDetail(no);
		return new ResponseEntity<Post>(postDetail, HttpStatus.OK);
	}
}
