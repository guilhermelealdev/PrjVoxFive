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

import com.guilhermef.br.requestDtos.FeedbackRequestDto;
import com.guilhermef.br.responseDtos.FeedbackResponseDto;
import com.guilhermef.br.services.FeedbackService;
import com.guilhermef.br.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/users/feedbacks")
public class FeedbackController {
	
	private final FeedbackService feedbackService;
	private final DateUtil dateUtil;
	
	@GetMapping("/name")
	public ResponseEntity<List<FeedbackResponseDto>> findByUsername(@RequestParam String username) {
	    log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
	    return new ResponseEntity<>(feedbackService.findByUsername(username), HttpStatus.OK);
	}
	
	@GetMapping("/type")
	public ResponseEntity<List<FeedbackResponseDto>> findByType(@RequestParam String type) {
	    log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
	    return new ResponseEntity<>(feedbackService.findByType(type), HttpStatus.OK);
	}
	
	@GetMapping("/status")
	public ResponseEntity<List<FeedbackResponseDto>> findByStatus(@RequestParam String status) {
	    log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
	    return new ResponseEntity<>(feedbackService.findByStatus(status), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<FeedbackResponseDto> save(@RequestBody FeedbackRequestDto dto) {
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		return new ResponseEntity<>(feedbackService.save(dto), HttpStatus.CREATED);
	}
	
	@GetMapping("id")
	public ResponseEntity<FeedbackResponseDto> findById(@RequestParam Long id) {
		return new ResponseEntity<>(feedbackService.findById(id), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<FeedbackResponseDto>> listAll(){
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		return new ResponseEntity<>(feedbackService.listAll(), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		feedbackService.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<FeedbackResponseDto> update(@RequestBody FeedbackRequestDto dto, @PathVariable Long id) {
		log.info(dateUtil.formatLocalTimeToDatabaseStyle(LocalDateTime.now()));
		return new ResponseEntity<>(feedbackService.update(id, dto), HttpStatus.OK);
	}
}
