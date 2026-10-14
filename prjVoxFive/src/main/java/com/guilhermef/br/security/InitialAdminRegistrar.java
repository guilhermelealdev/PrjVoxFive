package com.guilhermef.br.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermef.br.entities.User;
import com.guilhermef.br.repositories.UserRepository;

@Component
public class InitialAdminRegistrar implements ApplicationRunner {

	private static final Logger log = LoggerFactory.getLogger(InitialAdminRegistrar.class);

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final BootstrapAdminProperties properties;

	public InitialAdminRegistrar(UserRepository userRepository, PasswordEncoder passwordEncoder, BootstrapAdminProperties properties) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.properties = properties;
	}

	@Override
	@Transactional
	public void run(ApplicationArguments args) {
		if (isBlank(properties.username()) || isBlank(properties.password()) || isBlank(properties.email())) {
			return;
		}
		if (userRepository.findByUsername(properties.username()).isPresent()) {
			return;
		}
		if (userRepository.findByEmail(properties.email()).isPresent()) {
			return;
		}
		User admin = new User();
		admin.setUsername(properties.username());
		admin.setEmail(properties.email());
		admin.setPassword(passwordEncoder.encode(properties.password()));
		admin.setRole("ADMIN");
		userRepository.save(admin);
		log.info("bootstrap admin created username={}", properties.username());
	}

	private boolean isBlank(String value) {
		return value == null || value.isBlank();
	}
}