package com.guilhermef.br.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_feedbacks")
@NoArgsConstructor
public class Feedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@CreationTimestamp
	@Column(name = "creation", nullable = false, updatable = false)
	private LocalDateTime creation;

	@NotBlank
	@Column(nullable = false, length = 50)
	private String type;

	@NotBlank
	@Column(nullable = false, length = 50)
	private String status;

	@NotBlank
	@Column(nullable = false, length = 4000)
	private String message;

	@Column(length = 4000)
	private String response;

	@Override
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof Feedback feedback)) {
			return false;
		}
		return id != null && id.equals(feedback.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}