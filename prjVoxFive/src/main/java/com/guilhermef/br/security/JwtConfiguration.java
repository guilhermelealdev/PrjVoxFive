package com.guilhermef.br.security;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.security.Keys;

@Configuration
public class JwtConfiguration {

	@Bean
	public SecretKey jwtSigningKey(JwtProperties properties) {
		String secret = properties.secret();
		if (secret == null || secret.isBlank()) {
			throw new IllegalStateException("app.jwt.secret must be configured.");
		}
		byte[] secretBytes = secret.getBytes(StandardCharsets.UTF_8);
		if (secretBytes.length < 32) {
			throw new IllegalStateException("app.jwt.secret must contain at least 32 bytes for HS256.");
		}
		return Keys.hmacShaKeyFor(secretBytes);
	}
}