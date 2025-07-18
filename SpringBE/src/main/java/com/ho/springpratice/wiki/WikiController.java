package com.ho.springpratice.wiki;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class WikiController {
	@Autowired
	private WikiDAO wDAO;
	
	@RequestMapping(value = "/api/wiki/img/temp/{file}", method = RequestMethod.GET)
	@ResponseBody
	public Resource wikiTempImg(@PathVariable("file") String f) {
		return wDAO.getWikiTempImg(f);
	}
	
	@RequestMapping(value = "/api/wiki/img/temp/upload", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public ResponseEntity<?> regImgTempUpload(@RequestParam("file") MultipartFile file){
		try {
			String fileName = wDAO.regWikiTempImg(file);
			String imageUrl = fileName;

			HashMap<String, String> result = new HashMap<String, String>();
			result.put("url", imageUrl);
			
			return new ResponseEntity<HashMap<String, String>>(result, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<String>("업로드 실패",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
