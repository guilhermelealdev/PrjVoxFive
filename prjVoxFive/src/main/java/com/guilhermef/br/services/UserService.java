package com.guilhermef.br.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.guilhermef.br.entities.User;
import com.guilhermef.br.exceptions.BadRequestException;
import com.guilhermef.br.mappers.UserMapper;
import com.guilhermef.br.repositories.UserRepository;
import com.guilhermef.br.requestDtos.UserRequestDto;
import com.guilhermef.br.responseDtos.UserResponseDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;

	public UserResponseDto findByEmail(String email) {

		User user = userRepository.findByEmail(email).orElseThrow(() -> new BadRequestException("Email not found."));

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
		userRepository.findByEmail(dto.getEmail()).ifPresent(user -> {
			throw new BadRequestException("E-mail already exists.");
		});

		User user = userMapper.toUser(dto);
		user.setRole(role);
		User savedUser = userRepository.save(user);
		return userMapper.toUserResponseDto(savedUser);
	}

	public User findByIdOrThrowBadRequest(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("User not found!"));
		return user;
	}

	public UserResponseDto findById(Long id) {
		User user = findByIdOrThrowBadRequest(id);
		return userMapper.toUserResponseDto(user);
	}

	public List<UserResponseDto> listAll() {
		return userRepository.findAll().stream().map(user -> userMapper.toUserResponseDto(user)).toList();
	}

	public UserResponseDto update(Long id, UserRequestDto dto) {
		User user = findByIdOrThrowBadRequest(id);
		userMapper.updateUserFromDto(dto, user);
		User updatedUser = userRepository.save(user);
		return userMapper.toUserResponseDto(updatedUser);
	}

	public void deleteById(Long id) {
		findByIdOrThrowBadRequest(id);
		userRepository.deleteById(id);
	}
}