package com.guilhermef.br.requestDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequestDto(

		@NotBlank
		@Size(min = 3, max = 100)
		String username,

		@NotBlank
		@Size(min = 12, max = 128)
		@Pattern(
				regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
				message = "Password must contain lowercase, uppercase and digit"
		)
		String password,

		@NotBlank
		@Email
		@Size(max = 255)
		String email
) {
}