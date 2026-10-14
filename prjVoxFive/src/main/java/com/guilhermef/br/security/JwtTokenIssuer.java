package com.guilhermef.br.security;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.guilhermef.br.auth.TokenResponse;

import io.jsonwebtoken.Jwts;

@Component
public class JwtTokenIssuer {

	public static final String CLAIM_ROLE = "role";
	public static final String CLAIM_TOKEN_TYPE = "type";
	public static final String TOKEN_TYPE_ACCESS = "access";
	public static final String TOKEN_TYPE_REFRESH = "refresh";

	private final SecretKey signingKey;
	private final JwtProperties properties;

	public JwtTokenIssuer(SecretKey signingKey, JwtProperties properties) {
		this.signingKey = signingKey;
		this.properties = properties;
	}

	public TokenResponse issueTokens(String username, String role) {
		Instant issuedAt = Instant.now();
		String accessToken = buildToken(username, role, issuedAt, properties.accessTokenTtl(), TOKEN_TYPE_ACCESS);
		String refreshToken = buildToken(username, role, issuedAt, properties.refreshTokenTtl(), TOKEN_TYPE_REFRESH);
		return new TokenResponse(accessToken, refreshToken, properties.accessTokenTtl().toSeconds());
	}

	private String buildToken(String username, String role, Instant issuedAt, Duration ttl, String tokenType) {
		return Jwts.builder()
				.subject(username)
				.issuer(properties.issuer())
				.issuedAt(Date.from(issuedAt))
				.expiration(Date.from(issuedAt.plus(ttl)))
				.id(UUID.randomUUID().toString())
				.claim(CLAIM_ROLE, role)
				.claim(CLAIM_TOKEN_TYPE, tokenType)
				.signWith(signingKey, Jwts.SIG.HS256)
				.compact();
	}
}