package com.guilhermef.br.responseDtos;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.guilhermef.br.utils.DateUtil;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FeedbackResponseDto {
	
	@NotBlank
	private Long id;
	
	@DateTimeFormat
	private String creation = new DateUtil().formatLocalTimeToDatabaseStyle(LocalDateTime.now());
	
	@NotBlank
	private String type;
	
	@NotBlank
	private String message;
	
	@NotBlank
	private String response;
	
}
