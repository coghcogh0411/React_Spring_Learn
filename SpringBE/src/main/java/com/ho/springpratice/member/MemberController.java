package com.ho.springpratice.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class MemberController {
	@Autowired MemberDAO mDAO;
	
	@RequestMapping(value = "/api/member/signup", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<String> signup(@RequestBody Member m){
		try {
			System.out.println("123");
			mDAO.regMember(m);
			return new ResponseEntity<String>("회원가입 성공",HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<String>("회원가입 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@RequestMapping(value = "api/member/login", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> login(@RequestBody Member m){
		try {
			Map<String, Object> response = mDAO.loginMember(m);
			if(response != null) {
				return ResponseEntity.ok(response);
			}
			else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
			}
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
		}
	}
	
	@RequestMapping(value = "api/member/me", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getMemberInfo(@RequestHeader("Authorization") String token){
		try {
			Map<String, Object> memberInfo = mDAO.getInfo(token);
			return ResponseEntity.ok(memberInfo);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
}
