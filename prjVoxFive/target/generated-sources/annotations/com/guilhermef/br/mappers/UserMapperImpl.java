package com.guilhermef.br.mappers;

import com.guilhermef.br.entities.Feedback;
import com.guilhermef.br.entities.User;
import com.guilhermef.br.requestDtos.UserRequestDto;
import com.guilhermef.br.responseDtos.UserResponseDto;
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
public class UserMapperImpl extends UserMapper {

    @Override
    public UserResponseDto toUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setEmail( user.getEmail() );
        userResponseDto.setId( user.getId() );
        userResponseDto.setUsername( user.getUsername() );

        return userResponseDto;
    }

    @Override
    public User toUser(UserRequestDto userRequest) {
        if ( userRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( userRequest.getEmail() );
        List<Feedback> list = userRequest.getFeedback();
        if ( list != null ) {
            user.feedback( new ArrayList<Feedback>( list ) );
        }
        user.id( userRequest.getId() );
        user.password( userRequest.getPassword() );
        user.role( userRequest.getRole() );
        user.username( userRequest.getUsername() );

        return user.build();
    }

    @Override
    public List<UserResponseDto> toUserResponseDtoList(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserResponseDto> list = new ArrayList<UserResponseDto>( users.size() );
        for ( User user : users ) {
            list.add( toUserResponseDto( user ) );
        }

        return list;
    }

    @Override
    public User updateUserFromDto(UserRequestDto dto, User user) {
        if ( dto == null ) {
            return user;
        }

        if ( dto.getEmail() != null ) {
            user.setEmail( dto.getEmail() );
        }
        if ( user.getFeedback() != null ) {
            List<Feedback> list = dto.getFeedback();
            if ( list != null ) {
                user.getFeedback().clear();
                user.getFeedback().addAll( list );
            }
        }
        else {
            List<Feedback> list = dto.getFeedback();
            if ( list != null ) {
                user.setFeedback( new ArrayList<Feedback>( list ) );
            }
        }
        if ( dto.getId() != null ) {
            user.setId( dto.getId() );
        }
        if ( dto.getPassword() != null ) {
            user.setPassword( dto.getPassword() );
        }
        if ( dto.getRole() != null ) {
            user.setRole( dto.getRole() );
        }
        if ( dto.getUsername() != null ) {
            user.setUsername( dto.getUsername() );
        }

        return user;
    }
}
