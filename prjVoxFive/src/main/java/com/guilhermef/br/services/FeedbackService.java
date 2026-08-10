package com.guilhermef.br.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.guilhermef.br.entities.Feedback;
import com.guilhermef.br.exceptions.BadRequestException;
import com.guilhermef.br.mappers.FeedbackMapper;
import com.guilhermef.br.repositories.FeedbackRepository;
import com.guilhermef.br.requestDtos.FeedbackRequestDto;
import com.guilhermef.br.responseDtos.FeedbackResponseDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackService {

	private final FeedbackRepository feedbackRepository;
	private final FeedbackMapper feedbackMapper;
	
	
	public List<FeedbackResponseDto> findByUsername(String username) {
		List<Feedback> feedbacks = feedbackRepository.findByUserUsername(username);
		return feedbackMapper.toFeedbackResponseDtoList(feedbacks);
	}
	
	public List<FeedbackResponseDto> findByType(String type) {
		List<Feedback> feedbacks = feedbackRepository.findByType(type);
		return feedbackMapper.toFeedbackResponseDtoList(feedbacks);
	}
	
	public List<FeedbackResponseDto> findByStatus(String status) {
		List<Feedback> feedbacks = feedbackRepository.findByStatus(status);
		return feedbackMapper.toFeedbackResponseDtoList(feedbacks);
	}

	@Transactional
	public FeedbackResponseDto save(FeedbackRequestDto dto) {
		Feedback feedback = feedbackMapper.toFeedback(dto);
		Feedback savedFeedback = feedbackRepository.save(feedback);
		return feedbackMapper.toFeedbackResponseDto(savedFeedback);
	}

	public Feedback findOrThrowBadRequest(Long id) {
		Feedback feedback = feedbackRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Feedback not found!"));
		return feedback;
	}

	public FeedbackResponseDto findById(Long id) {
		Feedback feedback = findOrThrowBadRequest(id);
		return feedbackMapper.toFeedbackResponseDto(feedback);
	}

	public List<FeedbackResponseDto> listAll() {
		return feedbackRepository.findAll().stream().map(feedback -> feedbackMapper.toFeedbackResponseDto(feedback))
				.toList();
	}

	public void deleteById(Long id) {
		findOrThrowBadRequest(id);
		feedbackRepository.deleteById(id);
	}

	public FeedbackResponseDto update(Long id, FeedbackRequestDto dto) {
		Feedback feedback = findOrThrowBadRequest(id);
		feedbackMapper.updateFeedbackFromDto(dto, feedback);
		Feedback updatedFeedback = feedbackRepository.save(feedback);
		return feedbackMapper.toFeedbackResponseDto(updatedFeedback);
	}

}
