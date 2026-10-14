package com.guilhermef.br.security;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.rate-limit")
public record RateLimitProperties(
		int loginMaxRequestsPerIp,
		Duration loginWindow,
		int registerMaxRequestsPerIp,
		Duration registerWindow,
		int refreshMaxRequestsPerIp,
		Duration refreshWindow
) {
}