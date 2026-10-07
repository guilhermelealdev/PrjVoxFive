package com.guilhermef.br.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermef.br.entities.User;
import com.guilhermef.br.exceptions.DuplicateResourceException;
import com.guilhermef.br.exceptions.ResourceNotFoundException;
import com.guilhermef.br.mappers.UserMapper;
import com.guilhermef.br.repositories.UserRepository;
import com.guilhermef.br.requestDtos.UserRequestDto;
import com.guilhermef.br.responseDtos.UserResponseDto;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.passwordEncoder = passwordEncoder;
	}

	@Transactional(readOnly = true)
	public UserResponseDto findByEmail(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found."));
		return userMapper.toUserResponseDto(user);
	}

	@Transactional(readOnly = true)
	public UserResponseDto findByUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found."));
		return userMapper.toUserResponseDto(user);
	}

	@Transactional
	public UserResponseDto saveAdmin(UserRequestDto dto) {
		return saveUserWithRole(dto, "ADMIN");
	}

	@Transactional
	public UserResponseDto saveUser(UserRequestDto dto) {
		return saveUserWithRole(dto, "USER");
	}

	private UserResponseDto saveUserWithRole(UserRequestDto dto, String role) {
		if (userRepository.findByUsername(dto.username()).isPresent()) {
			throw new DuplicateResourceException("Username already exists.");
		}
		if (userRepository.findByEmail(dto.email()).isPresent()) {
			throw new DuplicateResourceException("E-mail already exists.");
		}
		User user = userMapper.toUser(dto);
		user.setPassword(passwordEncoder.encode(dto.password()));
		user.setRole(role);
		User savedUser = userRepository.save(user);
		return userMapper.toUserResponseDto(savedUser);
	}

	@Transactional(readOnly = true)
	public UserResponseDto findById(Long id) {
		return userMapper.toUserResponseDto(findByIdOrThrow(id));
	}

	@Transactional(readOnly = true)
	public List<UserResponseDto> listAll() {
		return userMapper.toUserResponseDtoList(userRepository.findAll());
	}

	@Transactional
	public UserResponseDto update(Long id, UserRequestDto dto) {
		User user = findByIdOrThrow(id);
		userMapper.updateUserFromDto(dto, user);
		if (dto.password() != null && !dto.password().isBlank()) {
			user.setPassword(passwordEncoder.encode(dto.password()));
		}
		User updatedUser = userRepository.save(user);
		return userMapper.toUserResponseDto(updatedUser);
	}

	@Transactional
	public void deleteById(Long id) {
		User user = findByIdOrThrow(id);
		userRepository.delete(user);
	}

	private User findByIdOrThrow(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found."));
	}
}