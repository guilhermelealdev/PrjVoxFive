package com.guilhermef.br.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_users")
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Column(nullable = false, unique = true, length = 100)
	private String username;

	@JsonIgnore
	@NotBlank
	@Column(nullable = false, length = 255)
	private String password;

	@Email
	@Column(nullable = false, unique = true, length = 255)
	private String email;

	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Feedback> feedback = new ArrayList<>();

	@NotBlank
	@Column(nullable = false, updatable = false, length = 20)
	private String role;

	@Override
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof User user)) {
			return false;
		}
		return id != null && id.equals(user.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}