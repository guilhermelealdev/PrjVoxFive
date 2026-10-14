package com.guilhermef.br.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guilhermef.br.requestDtos.UserRequestDto;
import com.guilhermef.br.responseDtos.UserResponseDto;
import com.guilhermef.br.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/email")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserResponseDto> findByEmail(@RequestParam String email) {
		return ResponseEntity.ok(userService.findByEmail(email));
	}

	@GetMapping("/name")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserResponseDto> findByUsername(@RequestParam String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}

	@PostMapping
	public ResponseEntity<UserResponseDto> saveUser(@Valid @RequestBody UserRequestDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(dto));
	}

	@PostMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserResponseDto> saveAdmin(@Valid @RequestBody UserRequestDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveAdmin(dto));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserResponseDto> update(@PathVariable Long id, @Valid @RequestBody UserRequestDto dto) {
		return ResponseEntity.ok(userService.update(id, dto));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		userService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/id")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserResponseDto> getById(@RequestParam Long id) {
		return ResponseEntity.ok(userService.findById(id));
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<UserResponseDto>> listAll() {
		return ResponseEntity.ok(userService.listAll());
	}
}