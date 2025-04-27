package com.ho.springpratice.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MemberController {
	@Autowired MemberDAO mDAO;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/api/member/signup", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> signup(@RequestBody Member m){
		try {
			System.out.println("123");
			mDAO.reg(m);
			return new ResponseEntity<String>("회원가입 성공",HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<String>("회원가입 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
