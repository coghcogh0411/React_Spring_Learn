package com.ho.springpratice.member;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberDAO {
	@Autowired
	private SqlSession ss;
	
	public void reg(Member m) {
		try {
			if(ss.getMapper(MemberMapper.class).regMember(m)==1) {
				System.out.println("등록성공");
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("등록실패");
		}
	}
}
