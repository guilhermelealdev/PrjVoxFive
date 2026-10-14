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

import com.guilhermef.br.requestDtos.FeedbackAnswerRequestDto;
import com.guilhermef.br.requestDtos.FeedbackRequestDto;
import com.guilhermef.br.responseDtos.FeedbackResponseDto;
import com.guilhermef.br.services.FeedbackService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

	private final FeedbackService feedbackService;

	public FeedbackController(FeedbackService feedbackService) {
		this.feedbackService = feedbackService;
	}

	@GetMapping("/name")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<FeedbackResponseDto>> findByUsername(@RequestParam String username) {
		return ResponseEntity.ok(feedbackService.findByUsername(username));
	}

	@GetMapping("/type")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<FeedbackResponseDto>> findByType(@RequestParam String type) {
		return ResponseEntity.ok(feedbackService.findByType(type));
	}

	@GetMapping("/status")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<FeedbackResponseDto>> findByStatus(@RequestParam String status) {
		return ResponseEntity.ok(feedbackService.findByStatus(status));
	}

	@PostMapping
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<FeedbackResponseDto> save(@Valid @RequestBody FeedbackRequestDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.save(dto));
	}

	@GetMapping("/id")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<FeedbackResponseDto> findById(@RequestParam Long id) {
		return ResponseEntity.ok(feedbackService.findById(id));
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<FeedbackResponseDto>> listAll() {
		return ResponseEntity.ok(feedbackService.listAll());
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		feedbackService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<FeedbackResponseDto> update(@PathVariable Long id, @Valid @RequestBody FeedbackRequestDto dto) {
		return ResponseEntity.ok(feedbackService.update(id, dto));
	}

	@PutMapping("/admin/{id}/reply")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<FeedbackResponseDto> answer(@PathVariable Long id, @Valid @RequestBody FeedbackAnswerRequestDto dto) {
		return ResponseEntity.ok(feedbackService.answer(id, dto));
	}
}