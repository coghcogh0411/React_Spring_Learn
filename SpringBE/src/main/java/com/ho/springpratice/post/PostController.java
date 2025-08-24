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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@CrossOrigin(origins = "https://guparesourcepack.duckdns.org")
@Controller
public class PostController {
	@Autowired
	private PostDAO pDAO;

	@RequestMapping(value = "/post/reg", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> regPost(@RequestBody Post p, @RequestHeader("Authorization") String token) {
		try {
			pDAO.regPost(p, token);
			return new ResponseEntity<String>("게시글 등록 성공", HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("게시글 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/post/get", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getPost(@RequestParam("page") int page) {
		try {
			//pageSize 3으로 테스트 성공
			int pageSize = 10;
			int offset = (page - 1) * pageSize;
			List<Post> posts = pDAO.getPost(offset, pageSize);
			return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("게시글 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/post/{no}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getPost(@PathVariable BigDecimal no) {
		Post postDetail = pDAO.getPostDetail(no);
		return new ResponseEntity<Post>(postDetail, HttpStatus.OK);
	}

	// 댓글 등록
	@RequestMapping(value = "/post/{no}/regReply", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> regPostReply(@PathVariable("no") BigDecimal no, @RequestBody PostReply pr,
			@RequestHeader("Authorization") String token) {
		try {
			pDAO.regPostReply(no, pr, token);
			return new ResponseEntity<String>("댓글 등록 성공", HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("댓글 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 댓글 불러오기
	@RequestMapping(value = "/post/{no}/getReply", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getPostReply(@PathVariable BigDecimal no) {
		try {
			List<PostReply> postReply = pDAO.getPostReply(no);
			return new ResponseEntity<List<PostReply>>(postReply, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("댓글 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
