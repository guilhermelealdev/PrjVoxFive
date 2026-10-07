package com.guilhermef.br.ratelimit;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.guilhermef.br.handler.ApiErrorResponse;
import com.guilhermef.br.security.RateLimitProperties;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 20)
public class RateLimitFilter extends OncePerRequestFilter {

	private final InMemoryRequestRateLimiter rateLimiter;
	private final RateLimitProperties properties;
	private final ObjectMapper objectMapper;

	public RateLimitFilter(InMemoryRequestRateLimiter rateLimiter, RateLimitProperties properties, ObjectMapper objectMapper) {
		this.rateLimiter = rateLimiter;
		this.properties = properties;
		this.objectMapper = objectMapper;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String ip = resolveClientIp(request);
		Rule rule = resolveRule(request);

		if (rule != null && !rateLimiter.tryAcquire(rule.keyPrefix() + ":" + ip, rule.maxRequests(), rule.window())) {
			writeTooManyRequests(response, request, rule.window());
			return;
		}

		filterChain.doFilter(request, response);
	}

	private Rule resolveRule(HttpServletRequest request) {
		String method = request.getMethod();
		String path = request.getRequestURI();

		if (HttpMethod.POST.matches(method) && "/auth/login".equals(path)) {
			return new Rule("login", properties.loginMaxRequestsPerIp(), properties.loginWindow());
		}
		if (HttpMethod.POST.matches(method) && "/auth/refresh".equals(path)) {
			return new Rule("refresh", properties.refreshMaxRequestsPerIp(), properties.refreshWindow());
		}
		if (HttpMethod.POST.matches(method) && "/users".equals(path)) {
			return new Rule("register", properties.registerMaxRequestsPerIp(), properties.registerWindow());
		}
		return null;
	}

	private String resolveClientIp(HttpServletRequest request) {
		String forwardedFor = request.getHeader("X-Forwarded-For");
		if (forwardedFor != null && !forwardedFor.isBlank()) {
			return forwardedFor.split(",")[0].trim();
		}
		return request.getRemoteAddr();
	}

	private void writeTooManyRequests(HttpServletResponse response, HttpServletRequest request, Duration window) throws IOException {
		ApiErrorResponse body = new ApiErrorResponse(
				LocalDateTime.now(ZoneOffset.UTC),
				HttpStatus.TOO_MANY_REQUESTS.value(),
				"Too Many Requests",
				"Rate limit exceeded.",
				request.getRequestURI()
		);
		response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setHeader("Retry-After", String.valueOf(window.toSeconds()));
		objectMapper.writeValue(response.getOutputStream(), body);
	}

	private record Rule(String keyPrefix, int maxRequests, Duration window) {
	}
}