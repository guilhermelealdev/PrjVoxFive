package com.guilhermef.br.requestDtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FeedbackRequestDto(

		@NotNull
		Long userId,

		@NotBlank
		@Size(max = 50)
		String type,

		@NotBlank
		@Size(max = 50)
		String status,

		@NotBlank
		@Size(max = 4000)
		String message,

		@Size(max = 4000)
		String response
) {
}