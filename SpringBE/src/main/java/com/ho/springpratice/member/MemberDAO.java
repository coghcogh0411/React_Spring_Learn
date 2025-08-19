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
			m.setProvider("LOCAL");
			m.setProvider_id(null);
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
		String userName = JwtUtil.validateToken(jwtToken).get("name", String.class);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("id", userId);
		result.put("name", userName);
		return result;
	}

	public Member getKakaoUserInfo(String code) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", clientId);
		params.add("redirect_uri", redirectUri);
		params.add("code", code);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(params,
				headers);
		ResponseEntity<String> response = restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", request,
				String.class);
		JSONObject json = new JSONObject(response.getBody());
		String accessToken = json.getString("access_token");
		System.out.println(accessToken);

		RestTemplate restTemplate1 = new RestTemplate();
		HttpHeaders headers1 = new HttpHeaders();
		headers1.add("Authorization", "Bearer " + accessToken);
		headers1.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

		HttpEntity<String> kakaoRequest = new HttpEntity<String>(headers1);

		ResponseEntity<String> response1 = restTemplate1.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST,
				kakaoRequest, String.class);
		JSONObject json1 = new JSONObject(response1.getBody());
		Long id = json1.getLong("id");
		String idStr = id.toString();
		// 닉네임 가져오기
		JSONObject properties = json1.getJSONObject("properties");
		String nickname = properties.getString("nickname");

		Member member = new Member();
		member.setProvider_id(idStr);
		member.setName(nickname);
		return member;
	}

	public Map<String, Object> loginKakaoMember(Member m) {
		try {
			Member member = ss.getMapper(MemberMapper.class).getKakaoMember(m.getProvider_id());
			if (member == null) {
				member = new Member();
				member.setId("kakao_" + m.getProvider_id());
				member.setName(m.getName());
				member.setPassword(null);
				member.setProvider_id(m.getProvider_id());
				member.setProvider("kakao");
				ss.getMapper(MemberMapper.class).regMember(member);
			}
			String token = JwtUtil.createToken(member);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("token", token);
			response.put("id", member.getId());
			response.put("name", member.getName());
			
			return response;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}
}
