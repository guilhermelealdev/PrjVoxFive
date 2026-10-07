package com.guilhermef.br.security;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordEncoderProvider {

	private static final String DEFAULT_ENCODING_ID = "bcrypt";

	@Bean
	public PasswordEncoder passwordEncoder() {
		Map<String, PasswordEncoder> encoders = Map.of(
				DEFAULT_ENCODING_ID, new BCryptPasswordEncoder(12)
		);
		return new DelegatingPasswordEncoder(DEFAULT_ENCODING_ID, encoders);
	}
}