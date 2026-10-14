package com.guilhermef.br.security;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class RevokedTokenRegistry {

	private final Map<String, Instant> revokedTokenExpirations = new ConcurrentHashMap<>();

	public void revoke(String jwtId, long ttlSeconds) {
		revokedTokenExpirations.put(jwtId, Instant.now().plusSeconds(ttlSeconds));
	}

	public boolean isRevoked(String jwtId) {
		Instant expiresAt = revokedTokenExpirations.get(jwtId);
		if (expiresAt == null) {
			return false;
		}
		if (expiresAt.isBefore(Instant.now())) {
			revokedTokenExpirations.remove(jwtId);
			return false;
		}
		return true;
	}
}