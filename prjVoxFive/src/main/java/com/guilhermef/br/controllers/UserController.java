package com.guilhermef.br.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.guilhermef.br.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/users")
public class UserController {
	private final UserService userService;
	private final DateUtil dateUtil;
	
	@GetMapping("/email")
	public ResponseEntity<UserResponseDto> findByEmail(@RequestParam String email) {
	    log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
	    return new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
	}

	@PostMapping
	public UserResponseDto save(@RequestBody UserRequestDto dto) {
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		return userService.save(dto);
	}

	@PutMapping("/{id}")
	public UserResponseDto update(@PathVariable Long id, @RequestBody UserRequestDto dto) {
		return userService.update(id, dto);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		userService.deleteById(id);
	}
	
	@GetMapping("/id")
	public UserResponseDto getById(@RequestParam Long id) {
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		return userService.findById(id);
	}
	
	@GetMapping
	public List<UserResponseDto> listAll(){
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		return userService.listAll();
	}
}
