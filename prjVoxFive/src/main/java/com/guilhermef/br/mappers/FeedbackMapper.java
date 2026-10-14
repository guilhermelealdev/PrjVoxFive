package com.guilhermef.br.mappers;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.guilhermef.br.entities.Feedback;
import com.guilhermef.br.requestDtos.FeedbackRequestDto;
import com.guilhermef.br.responseDtos.FeedbackResponseDto;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {

	FeedbackResponseDto toFeedbackResponseDto(Feedback feedback);

	List<FeedbackResponseDto> toFeedbackResponseDtoList(List<Feedback> feedbacks);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "user", ignore = true)
	@Mapping(target = "creation", ignore = true)
	Feedback toFeedback(FeedbackRequestDto dto);

	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "user", ignore = true)
	@Mapping(target = "creation", ignore = true)
	void updateFeedbackFromDto(FeedbackRequestDto dto, @MappingTarget Feedback feedback);
}