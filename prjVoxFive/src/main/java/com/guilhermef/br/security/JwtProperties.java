package com.guilhermef.br.security;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
		String issuer,
		Duration accessTokenTtl,
		Duration refreshTokenTtl,
		String secret
) {
}