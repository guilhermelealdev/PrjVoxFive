package com.guilhermef.br.security;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.guilhermef.br.exceptions.InvalidTokenException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Component
public class JwtTokenVerifier {

	private final SecretKey signingKey;

	public JwtTokenVerifier(SecretKey signingKey) {
		this.signingKey = signingKey;
	}

	public Claims parseAccessToken(String token) {
		Claims claims = parse(token);
		if (!JwtTokenIssuer.TOKEN_TYPE_ACCESS.equals(claims.get(JwtTokenIssuer.CLAIM_TOKEN_TYPE, String.class))) {
			throw new InvalidTokenException("Invalid token type.");
		}
		return claims;
	}

	public Claims parseRefreshToken(String token) {
		Claims claims = parse(token);
		if (!JwtTokenIssuer.TOKEN_TYPE_REFRESH.equals(claims.get(JwtTokenIssuer.CLAIM_TOKEN_TYPE, String.class))) {
			throw new InvalidTokenException("Invalid token type.");
		}
		return claims;
	}

	private Claims parse(String token) {
		try {
			return Jwts.parser()
					.verifyWith(signingKey)
					.build()
					.parseSignedClaims(token)
					.getPayload();
		} catch (JwtException | IllegalArgumentException ex) {
			throw new InvalidTokenException("Invalid token.");
		}
	}
}