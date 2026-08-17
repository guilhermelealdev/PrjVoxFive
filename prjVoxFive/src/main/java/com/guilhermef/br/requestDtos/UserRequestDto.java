package com.guilhermef.br.requestDtos;

import java.util.List;

import com.guilhermef.br.entities.Feedback;

import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequestDto {
	
	@NotBlank
	private Long id;

	@NotBlank
	private String username;

	@NotBlank
	private String password;

	@Email
	private String email;
	
	@OneToMany
	private List<Feedback> feedback;

	
	
}
