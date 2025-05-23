package com.ho.springpratice.data;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DataDAO {
	@Autowired
	private SqlSession ss;
	
	public void regData(String title, String option, MultipartFile file, HttpServletRequest req) {
		try {
			
			String uploadDir = "C:/data/";
			
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
}
