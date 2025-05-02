package com.ho.springpratice.member;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ho.springpratice.JwtUtil;

@Service
public class MemberDAO {
	@Autowired
	private SqlSession ss;

	// 회원가입
	public void regMember(Member m) {
		try {
			if (ss.getMapper(MemberMapper.class).regMember(m) == 1) {
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	// 로그인
	public Map<String, Object> loginMember(Member m) {
		try {
			Member dbMember = ss.getMapper(MemberMapper.class).getMember(m);
			if (dbMember != null) {
				if (m.getPassword().equals(dbMember.getPassword())) {
					String token = JwtUtil.createToken(dbMember);
					Map<String, Object> response = new HashMap<String, Object>();
					response.put("token", token);
					response.put("id", dbMember.getId());
			        response.put("name", dbMember.getName());
			        return response;
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
		return null;
	}
	
	public Map<String, Object> getInfo(String token) {
		String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
		
		String userId = JwtUtil.validateToken(jwtToken).getSubject();
		String userName = JwtUtil.validateToken(jwtToken).get("name",String.class);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("id", userId);
		result.put("name", userName);
		return result;
	}
}
