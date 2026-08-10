package com.guilhermef.br.handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.guilhermef.br.exceptions.BadRequestException;
import com.guilhermef.br.exceptions.InternalServerErrorException;
import com.guilhermef.br.exceptionsDetails.ExceptionDetails;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class RestControllerHandler {

	public ResponseEntity<ExceptionDetails> buildException(HttpStatus httpStatus, String title, String details,
			String developerMessage, String path) {
		ExceptionDetails exception = ExceptionDetails.builder().timestamp(LocalDateTime.now())
				.status(httpStatus.value()).title(title).details(details).developerMessage(developerMessage).path(path)
				.build();
		return new ResponseEntity<>(exception, httpStatus);
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ExceptionDetails> handlerBadRequestException(BadRequestException badRequest,
			HttpServletRequest request) {
		return buildException(HttpStatus.BAD_REQUEST, "Bad Request Exception, please insert valid credentials.",
				badRequest.getMessage(), badRequest.getClass().getName(), request.getRequestURI());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDetails> handlerGeneralException(InternalServerErrorException serverError,
			HttpServletRequest request) {
		return buildException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong, please check documentation.",
				serverError.getMessage(), serverError.getClass().getName(), request.getRequestURI());
	}
}