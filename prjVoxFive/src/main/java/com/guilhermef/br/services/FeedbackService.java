package com.guilhermef.br.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermef.br.entities.Feedback;
import com.guilhermef.br.entities.User;
import com.guilhermef.br.exceptions.ResourceNotFoundException;
import com.guilhermef.br.mappers.FeedbackMapper;
import com.guilhermef.br.repositories.FeedbackRepository;
import com.guilhermef.br.repositories.UserRepository;
import com.guilhermef.br.requestDtos.FeedbackAnswerRequestDto;
import com.guilhermef.br.requestDtos.FeedbackRequestDto;
import com.guilhermef.br.responseDtos.FeedbackResponseDto;

@Service
public class FeedbackService {

	private static final String ADMIN_ROLE = "ADMIN";
	private static final String STATUS_UNDER_REVIEW = "Em análise";
	private static final String STATUS_ANSWERED = "Respondido";

	private final FeedbackRepository feedbackRepository;
	private final UserRepository userRepository;
	private final FeedbackMapper feedbackMapper;

	public FeedbackService(FeedbackRepository feedbackRepository, UserRepository userRepository, FeedbackMapper feedbackMapper) {
		this.feedbackRepository = feedbackRepository;
		this.userRepository = userRepository;
		this.feedbackMapper = feedbackMapper;
	}

	@Transactional(readOnly = true)
	public List<FeedbackResponseDto> findByUsername(String username) {
		return feedbackMapper.toFeedbackResponseDtoList(feedbackRepository.findByUserUsername(username));
	}

	@Transactional(readOnly = true)
	public List<FeedbackResponseDto> findByType(String type) {
		return feedbackMapper.toFeedbackResponseDtoList(feedbackRepository.findByType(type));
	}

	@Transactional(readOnly = true)
	public List<FeedbackResponseDto> findByStatus(String status) {
		return feedbackMapper.toFeedbackResponseDtoList(feedbackRepository.findByStatus(status));
	}

	@Transactional
	public FeedbackResponseDto save(FeedbackRequestDto dto, String authenticatedUsername) {
		User owner = resolveOwner(dto.userId(), authenticatedUsername);
		Feedback feedback = feedbackMapper.toFeedback(dto);
		feedback.setUser(owner);
		feedback.setStatus(STATUS_UNDER_REVIEW);
		Feedback savedFeedback = feedbackRepository.save(feedback);
		return feedbackMapper.toFeedbackResponseDto(savedFeedback);
	}

	@Transactional(readOnly = true)
	public FeedbackResponseDto findById(Long id) {
		return feedbackMapper.toFeedbackResponseDto(findOrThrow(id));
	}

	@Transactional(readOnly = true)
	public List<FeedbackResponseDto> listAll() {
		return feedbackMapper.toFeedbackResponseDtoList(feedbackRepository.findAll());
	}

	@Transactional
	public void deleteById(Long id) {
		Feedback feedback = findOrThrow(id);
		feedbackRepository.delete(feedback);
	}

	@Transactional
	public FeedbackResponseDto update(Long id, FeedbackRequestDto dto) {
		Feedback feedback = findOrThrow(id);
		feedbackMapper.updateFeedbackFromDto(dto, feedback);
		Feedback updatedFeedback = feedbackRepository.save(feedback);
		return feedbackMapper.toFeedbackResponseDto(updatedFeedback);
	}

	@Transactional
	public FeedbackResponseDto answer(Long id, FeedbackAnswerRequestDto dto) {
		Feedback feedback = findOrThrow(id);
		feedback.setResponse(dto.getAnswer());
		feedback.setStatus(STATUS_ANSWERED);
		Feedback updatedFeedback = feedbackRepository.save(feedback);
		return feedbackMapper.toFeedbackResponseDto(updatedFeedback);
	}

	private User resolveOwner(Long requestedUserId, String authenticatedUsername) {
		User authenticated = userRepository.findByUsername(authenticatedUsername)
				.orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found."));

		boolean isAdmin = ADMIN_ROLE.equals(authenticated.getRole());
		if (!isAdmin) {
			return authenticated;
		}

		if (requestedUserId == null) {
			return authenticated;
		}

		return userRepository.findById(requestedUserId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found."));
	}

	private Feedback findOrThrow(Long id) {
		return feedbackRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Feedback not found."));
	}
}