package com.ho.springpratice.member;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.ho.springpratice.JwtUtil;

@Service
public class MemberDAO {
	@Autowired
	private SqlSession ss;
	
	@Value("${kakao.client-id}")
	private String clientId;
	
	@Value("${kakao.redirect-uri}")
    private String redirectUri;
	
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
	
	public void kakaoLogin(String code) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<String,String>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://kauth.kakao.com/oauth/token", request, String.class);
        JSONObject json = new JSONObject(response.getBody());
        String accessToken = json.getString("access_token");
        System.out.println(accessToken);
        
        RestTemplate restTemplate1 = new RestTemplate();
		HttpHeaders headers1 = new HttpHeaders();
		headers1.add("Authorization", "Bearer " + accessToken);
        headers1.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        
        HttpEntity<?> kakaoRequest = new HttpEntity<Map>(headers1);
        
        ResponseEntity<Map> response1 = restTemplate1.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoRequest,
                Map.class
        );
        System.out.println(response1);
	}
}
