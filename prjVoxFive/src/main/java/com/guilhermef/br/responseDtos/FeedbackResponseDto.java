package com.guilhermef.br.responseDtos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record FeedbackResponseDto(
		Long id,
		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
		LocalDateTime creation,
		String type,
		String status,
		String message,
		String response
) {
}