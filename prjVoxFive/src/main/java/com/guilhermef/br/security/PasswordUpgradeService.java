package com.guilhermef.br.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermef.br.entities.User;
import com.guilhermef.br.repositories.UserRepository;

@Service
public class PasswordUpgradeService implements UserDetailsPasswordService {

	private final UserRepository userRepository;

	public PasswordUpgradeService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	@Transactional
	public UserDetails updatePassword(UserDetails user, String newPassword) {
		User entity = userRepository.findByUsername(user.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User not found."));
		entity.setPassword(newPassword);
		userRepository.save(entity);
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + entity.getRole());
		return new AuthenticatedUser(entity.getUsername(), entity.getPassword(), List.of(authority));
	}
}