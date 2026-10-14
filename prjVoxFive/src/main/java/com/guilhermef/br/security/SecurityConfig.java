package com.guilhermef.br.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.guilhermef.br.honeypot.HoneypotFilter;
import com.guilhermef.br.honeypot.SuspiciousIpRegistry;
import com.guilhermef.br.ratelimit.InMemoryRequestRateLimiter;
import com.guilhermef.br.ratelimit.RateLimitFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	private final JwtTokenVerifier jwtTokenVerifier;
	private final RestAuthenticationEntryPoint authenticationEntryPoint;
	private final RestAccessDeniedHandler accessDeniedHandler;
	private final CorsProperties corsProperties;
	private final InMemoryRequestRateLimiter rateLimiter;
	private final RateLimitProperties rateLimitProperties;
	private final SuspiciousIpRegistry suspiciousIpRegistry;
	private final ObjectMapper objectMapper;

	public SecurityConfig(
			JwtTokenVerifier jwtTokenVerifier,
			RestAuthenticationEntryPoint authenticationEntryPoint,
			RestAccessDeniedHandler accessDeniedHandler,
			CorsProperties corsProperties,
			InMemoryRequestRateLimiter rateLimiter,
			RateLimitProperties rateLimitProperties,
			SuspiciousIpRegistry suspiciousIpRegistry,
			ObjectMapper objectMapper
	) {
		this.jwtTokenVerifier = jwtTokenVerifier;
		this.authenticationEntryPoint = authenticationEntryPoint;
		this.accessDeniedHandler = accessDeniedHandler;
		this.corsProperties = corsProperties;
		this.rateLimiter = rateLimiter;
		this.rateLimitProperties = rateLimitProperties;
		this.suspiciousIpRegistry = suspiciousIpRegistry;
		this.objectMapper = objectMapper;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		HoneypotFilter honeypotFilter = new HoneypotFilter(suspiciousIpRegistry);
		RateLimitFilter rateLimitFilter = new RateLimitFilter(rateLimiter, rateLimitProperties, objectMapper);
		JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenVerifier);

		http
				.csrf(AbstractHttpConfigurer::disable)
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.logout(AbstractHttpConfigurer::disable)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.requestMatchers("/auth/login", "/auth/refresh").permitAll()
						.requestMatchers(HttpMethod.POST, "/users").permitAll()
						.requestMatchers(HttpMethod.GET, "/actuator/health", "/actuator/info").permitAll()
						.requestMatchers(HttpMethod.GET, "/feedbacks/me").authenticated()
						.requestMatchers("/users/admin", "/users/admin/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/feedbacks").authenticated()
						.requestMatchers(HttpMethod.PUT, "/feedbacks/admin/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PUT, "/feedbacks/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/feedbacks/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PUT, "/users/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET, "/users/**").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET, "/feedbacks/**").hasRole("ADMIN")
						.anyRequest().authenticated()
				)
				.exceptionHandling(handling -> handling
						.authenticationEntryPoint(authenticationEntryPoint)
						.accessDeniedHandler(accessDeniedHandler)
				)
				.headers(headers -> {
					headers.contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'; frame-ancestors 'none'"));
					headers.frameOptions(frame -> frame.deny());
					headers.referrerPolicy(referrer -> referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.NO_REFERRER));
					headers.permissionsPolicy(permissions -> permissions.policy("geolocation=(), microphone=(), camera=()"));
					headers.httpStrictTransportSecurity(hsts -> hsts
							.includeSubDomains(true)
							.maxAgeInSeconds(31536000));
					headers.contentTypeOptions(Customizer.withDefaults());
				})
				.addFilterBefore(honeypotFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(corsProperties.allowedOrigins());
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Correlation-Id"));
		configuration.setExposedHeaders(List.of("X-Correlation-Id"));
		configuration.setAllowCredentials(false);
		configuration.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}