package com.guilhermef.br.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermef.br.entities.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

	@EntityGraph(attributePaths = "user")
	List<Feedback> findByUserUsername(String username);

	List<Feedback> findByType(String type);

	List<Feedback> findByStatus(String status);
}