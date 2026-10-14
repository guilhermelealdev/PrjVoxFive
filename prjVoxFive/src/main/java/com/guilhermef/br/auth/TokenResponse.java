package com.guilhermef.br.auth;

public record TokenResponse(
		String accessToken,
		String refreshToken,
		long expiresInSeconds
) {
}