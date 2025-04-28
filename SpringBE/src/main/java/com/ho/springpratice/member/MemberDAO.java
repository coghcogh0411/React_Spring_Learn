package com.ho.springpratice.member;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ho.springpratice.JwtUtil;

@Service
public class MemberDAO {
	@Autowired
	private SqlSession ss;
	
	//회원가입
	public void regMember(Member m) {
		try {
			if(ss.getMapper(MemberMapper.class).regMember(m)==1) {
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
	
	//로그인
	public String loginMember(Member m) {
		try {
			Member dbMember = ss.getMapper(MemberMapper.class).getMember(m);
				if(dbMember != null) {
					if(m.getPassword().equals(dbMember.getPassword())){
						String token = JwtUtil.createToken(dbMember.getId());
						return token;
					}
				}
				return null;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
}
