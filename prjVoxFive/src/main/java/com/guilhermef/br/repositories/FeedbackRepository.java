package com.guilhermef.br.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.guilhermef.br.entities.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

	@EntityGraph(attributePaths = "user")
	List<Feedback> findByUserUsername(String username);

	List<Feedback> findByType(String type);

	List<Feedback> findByStatus(String status);

	@Query("SELECT f FROM Feedback f WHERE " +
		   "(:startDate IS NULL OR f.creation >= :startDate) AND " +
		   "(:endDate IS NULL OR f.creation <= :endDate) AND " +
		   "(:type IS NULL OR f.type = :type) AND " +
		   "(:status IS NULL OR f.status = :status)")
	List<Feedback> findByFilters(
			@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate,
			@Param("type") String type,
			@Param("status") String status
	);
}