package com.guilhermef.br.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermef.br.exceptions.InvalidTokenException;
import com.guilhermef.br.security.JwtProperties;
import com.guilhermef.br.security.JwtTokenIssuer;
import com.guilhermef.br.security.JwtTokenVerifier;
import com.guilhermef.br.security.RevokedTokenRegistry;

import io.jsonwebtoken.Claims;

@Service
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final JwtTokenIssuer jwtTokenIssuer;
	private final JwtTokenVerifier jwtTokenVerifier;
	private final RevokedTokenRegistry revokedTokenRegistry;
	private final JwtProperties jwtProperties;

	public AuthService(
			AuthenticationManager authenticationManager,
			JwtTokenIssuer jwtTokenIssuer,
			JwtTokenVerifier jwtTokenVerifier,
			RevokedTokenRegistry revokedTokenRegistry,
			JwtProperties jwtProperties
	) {
		this.authenticationManager = authenticationManager;
		this.jwtTokenIssuer = jwtTokenIssuer;
		this.jwtTokenVerifier = jwtTokenVerifier;
		this.revokedTokenRegistry = revokedTokenRegistry;
		this.jwtProperties = jwtProperties;
	}

	@Transactional(readOnly = true)
	public TokenResponse login(LoginRequest request) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.username(), request.password()));
		String role = authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
		return jwtTokenIssuer.issueTokens(authentication.getName(), role);
	}

	public TokenResponse refresh(RefreshTokenRequest request) {
		Claims claims = jwtTokenVerifier.parseRefreshToken(request.refreshToken());
		String jwtId = claims.getId();
		if (revokedTokenRegistry.isRevoked(jwtId)) {
			throw new InvalidTokenException("Invalid refresh token.");
		}
		revokedTokenRegistry.revoke(jwtId, jwtProperties.refreshTokenTtl().toSeconds());
		String role = claims.get(JwtTokenIssuer.CLAIM_ROLE, String.class);
		return jwtTokenIssuer.issueTokens(claims.getSubject(), role);
	}
}