package com.ho.springpratice.wiki;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class WikiDAO {
	@Autowired
	private SqlSession ss;

	private String TempUploadDir = "C:/data/wiki/temp";
	private String UploadDir = "C:/data/wiki";

	public Resource getWikiTempImg(String f) {
		try {
			Path path = Paths.get(TempUploadDir, f);
			System.out.println("📁 요청 파일 경로: " + path);
			System.out.println("✅ 파일 존재 여부: " + Files.exists(path));
			
			return new UrlResource("file:" + TempUploadDir + "/" + f);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public String regWikiTempImg(MultipartFile file) {
		try {
			File dir = new File(TempUploadDir);
			if (!dir.exists()) {
				dir.mkdirs();
			}
			String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
			String saveFileName = UUID.randomUUID().toString() + extension;

			File saveFile = new File(TempUploadDir, saveFileName);
			file.transferTo(saveFile);
			return saveFileName;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}

	}
	public void regWikiTitle(WikiTitle wikiTitle) {
		try {
			if(ss.getMapper(WikiMapper.class).regWikiTitle(wikiTitle)==1) {
				System.out.println("위키제목등록성공");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("위키제목등록실패");
		}
	}
	public List<String> getWikiTitle(){
		try {
			List<String> title = ss.getMapper(WikiMapper.class).getWikiTitle();
			
			return title;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
}
