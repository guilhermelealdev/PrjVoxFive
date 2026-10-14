package com.guilhermef.br.security;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.guilhermef.br.exceptions.InvalidTokenException;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final String BEARER_PREFIX = "Bearer ";

	private final JwtTokenVerifier verifier;

	public JwtAuthenticationFilter(JwtTokenVerifier verifier) {
		this.verifier = verifier;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authorizationHeader == null || !authorizationHeader.startsWith(BEARER_PREFIX)) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = authorizationHeader.substring(BEARER_PREFIX.length());
		try {
			Claims claims = verifier.parseAccessToken(token);
			String username = claims.getSubject();
			String role = claims.get(JwtTokenIssuer.CLAIM_ROLE, String.class);

			AuthenticatedUser principal = new AuthenticatedUser(
					username,
					null,
					List.of(new SimpleGrantedAuthority("ROLE_" + role))
			);

			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					principal, null, principal.getAuthorities());
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (InvalidTokenException ex) {
			SecurityContextHolder.clearContext();
		}

		filterChain.doFilter(request, response);
	}
}