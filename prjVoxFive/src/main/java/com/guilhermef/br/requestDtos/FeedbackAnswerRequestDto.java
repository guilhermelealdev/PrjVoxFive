package com.guilhermef.br.requestDtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FeedbackAnswerRequestDto {
	@NotBlank
	private String answer;
}
