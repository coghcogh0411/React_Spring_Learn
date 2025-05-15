package com.ho.springpratice.data;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DataDAO {
	@Autowired
	private SqlSession ss;
	
	public void DataUpload(String title, String option, MultipartFile file) {
		Data data = new Data(title, option, file.getOriginalFilename());
		if(ss.getMapper(DataMapper.class).regData(data)==1) {
		}
	}
}
