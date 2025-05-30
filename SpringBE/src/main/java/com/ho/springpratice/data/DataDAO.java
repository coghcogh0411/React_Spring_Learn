package com.ho.springpratice.data;

import java.io.File;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DataDAO {
	@Autowired
	private SqlSession ss;
	
	private String uploadDir = "C:/data/";
	public void regData(String title, String option, MultipartFile file, HttpServletRequest req) {
		try {
			File dir = new File(uploadDir);
			if(!dir.exists()) {
				dir.mkdirs();
			}
			Data data = new Data(title, file.getOriginalFilename(), option);
			
			String saveFileName = data.getData_File() + "_" + UUID.randomUUID().toString();
			
			File saveFile = new File(uploadDir, saveFileName);
			file.transferTo(saveFile);
			
			data.setData_File(saveFileName);
			
			if(ss.getMapper(DataMapper.class).regData(data)==1) {
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}
	
	public List<Data> getData() {
		return ss.getMapper(DataMapper.class).getData();
	}
	
	public ResponseEntity<Resource> downloadFile(String fn){
		try {
			Resource ur = new UrlResource("file:"+ uploadDir +"/"+ fn);
			String h = "attachment; filename=\""+URLEncoder.encode(fn,"utf-8")+"\"";
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, h).body(ur);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	public void deleteFile(String fn) {
		try {
			if(ss.getMapper(DataMapper.class).delData(fn)==1) {
				File delFile= new File(uploadDir+fn);
				delFile.delete();
				System.out.println("삭제 성공");
			}
			System.out.println("mapper문제");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("삭제 실패");
		}
	}
}
