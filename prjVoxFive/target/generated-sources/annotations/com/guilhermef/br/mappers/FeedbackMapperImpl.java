package com.guilhermef.br.mappers;

import com.guilhermef.br.entities.Feedback;
import com.guilhermef.br.requestDtos.FeedbackRequestDto;
import com.guilhermef.br.responseDtos.FeedbackResponseDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-10T07:41:18-0300",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.42.0.v20250526-2018, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class FeedbackMapperImpl extends FeedbackMapper {

    @Override
    public FeedbackResponseDto toFeedbackResponseDto(Feedback feedback) {
        if ( feedback == null ) {
            return null;
        }

        FeedbackResponseDto feedbackResponseDto = new FeedbackResponseDto();

        feedbackResponseDto.setCreation( feedback.getCreation() );
        feedbackResponseDto.setId( feedback.getId() );
        feedbackResponseDto.setMessage( feedback.getMessage() );
        feedbackResponseDto.setResponse( feedback.getResponse() );
        feedbackResponseDto.setType( feedback.getType() );

        return feedbackResponseDto;
    }

    @Override
    public Feedback toFeedback(FeedbackRequestDto feedbackRequestDto) {
        if ( feedbackRequestDto == null ) {
            return null;
        }

        Feedback.FeedbackBuilder feedback = Feedback.builder();

        feedback.creation( feedbackRequestDto.getCreation() );
        feedback.id( feedbackRequestDto.getId() );
        feedback.message( feedbackRequestDto.getMessage() );
        feedback.response( feedbackRequestDto.getResponse() );
        feedback.status( feedbackRequestDto.getStatus() );
        feedback.type( feedbackRequestDto.getType() );
        feedback.user( feedbackRequestDto.getUser() );

        return feedback.build();
    }

    @Override
    public List<FeedbackResponseDto> toFeedbackResponseDtoList(List<Feedback> feedbacks) {
        if ( feedbacks == null ) {
            return null;
        }

        List<FeedbackResponseDto> list = new ArrayList<FeedbackResponseDto>( feedbacks.size() );
        for ( Feedback feedback : feedbacks ) {
            list.add( toFeedbackResponseDto( feedback ) );
        }

        return list;
    }

    @Override
    public Feedback updateFeedbackFromDto(FeedbackRequestDto dto, Feedback feedback) {
        if ( dto == null ) {
            return feedback;
        }

        if ( dto.getCreation() != null ) {
            feedback.setCreation( dto.getCreation() );
        }
        if ( dto.getId() != null ) {
            feedback.setId( dto.getId() );
        }
        if ( dto.getMessage() != null ) {
            feedback.setMessage( dto.getMessage() );
        }
        if ( dto.getResponse() != null ) {
            feedback.setResponse( dto.getResponse() );
        }
        if ( dto.getStatus() != null ) {
            feedback.setStatus( dto.getStatus() );
        }
        if ( dto.getType() != null ) {
            feedback.setType( dto.getType() );
        }
        if ( dto.getUser() != null ) {
            feedback.setUser( dto.getUser() );
        }

        return feedback;
    }
}
