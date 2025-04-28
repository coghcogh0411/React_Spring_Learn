package com.ho.springpratice;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private static final long EXPIRATION_TIME = 1000 * 60 * 60;
	
	public static String createToken(String userId) {
		return Jwts.builder()
				.setSubject(userId)
				.setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
				.signWith(SECRET_KEY)
				.compact();
	}
	public static String validateToken(String token) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(SECRET_KEY)
				.build()
				.parseClaimsJws(token)
				.getBody();
		return claims.getSubject();
	}
}
