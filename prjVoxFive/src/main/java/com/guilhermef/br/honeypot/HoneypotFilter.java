package com.guilhermef.br.honeypot;

import java.io.IOException;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class HoneypotFilter extends OncePerRequestFilter {

	private static final Logger log = LoggerFactory.getLogger(HoneypotFilter.class);

	private static final Set<String> HONEYPOT_PATHS = Set.of(
			"/.env",
			"/.git/config",
			"/wp-login",
			"/wp-admin",
			"/phpmyadmin",
			"/admin-backup"
	);

	private final SuspiciousIpRegistry suspiciousIpRegistry;

	public HoneypotFilter(SuspiciousIpRegistry suspiciousIpRegistry) {
		this.suspiciousIpRegistry = suspiciousIpRegistry;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String ip = resolveClientIp(request);
		if (suspiciousIpRegistry.isBlocked(ip)) {
			response.sendError(HttpStatus.FORBIDDEN.value());
			return;
		}

		if (HONEYPOT_PATHS.contains(request.getRequestURI())) {
			suspiciousIpRegistry.registerHit(ip);
			log.warn("honeypot triggered ip={} path={} userAgent={}",
					ip, request.getRequestURI(), request.getHeader("User-Agent"));
			response.sendError(HttpStatus.NOT_FOUND.value());
			return;
		}

		filterChain.doFilter(request, response);
	}

	private String resolveClientIp(HttpServletRequest request) {
		String forwardedFor = request.getHeader("X-Forwarded-For");
		if (forwardedFor != null && !forwardedFor.isBlank()) {
			return forwardedFor.split(",")[0].trim();
		}
		return request.getRemoteAddr();
	}
}