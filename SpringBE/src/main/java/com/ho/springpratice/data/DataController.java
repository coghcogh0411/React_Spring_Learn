package com.ho.springpratice.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ho.springpratice.member.Member;

public class DataController {
	@Autowired
	private DataDAO dDAO;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/api/data/upload", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<String> signup(@RequestParam("title") String title,
		    @RequestParam("option") String option,
		    @RequestParam("file") MultipartFile file){
		try {
			System.out.println("123");
			return new ResponseEntity<String>("업로드 성공",HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<String>("업로드 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
