package com.ho.springpratice.data;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
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
import org.springframework.web.multipart.MultipartFile;

import com.ho.springpratice.member.Member;

@CrossOrigin(origins = "https://guparesourcepack.duckdns.org:3000")
@Controller
public class DataController {
	@Autowired
	private DataDAO dDAO;
	
	@RequestMapping(value = "/api/data/upload", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<String> regData(
			@RequestParam("title") String title,
		    @RequestParam("option") String option,
		    @RequestParam("file") MultipartFile file,
		    @RequestHeader("Authorization") String token,
		    HttpServletRequest req){
		
		try {
			dDAO.regData(title, option, file, req);
			return new ResponseEntity<String>("업로드 성공",HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<String>("업로드 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@RequestMapping(value = "/api/data/get", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> getData(){
		return new ResponseEntity<List<Data>>(dDAO.getData(),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/data/download/{filename}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<Resource> downloadData(@PathVariable("filename") String fn){
		return dDAO.downloadFile(fn);
	}
	
	@RequestMapping(value = "/api/data/delete/{filename:.+}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteData(@PathVariable("filename") String fn){
		try {
			System.out.println(fn);
			dDAO.deleteFile(fn);
			return new ResponseEntity<String>("파일 삭제 성공",HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<String>("파일 삭제 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
