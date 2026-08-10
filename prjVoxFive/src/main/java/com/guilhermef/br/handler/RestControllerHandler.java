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

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ExceptionDetails> handlerBadRequestException(BadRequestException badRequest,
			HttpServletRequest request) {
		return new ResponseEntity<>(
				ExceptionDetails.builder().timestamp(LocalDateTime.now()).status(HttpStatus.BAD_REQUEST.value())
						.title("Bad Request Exception, check the documentation.").details(badRequest.getMessage())
						.developerMessage(badRequest.getClass().getName()).path(request.getRequestURI()).build(),
				HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDetails> handlerGeneralException(InternalServerErrorException serverError,
			HttpServletRequest request) {
		return new ResponseEntity<>(ExceptionDetails.builder().timestamp(LocalDateTime.now())
				.status(HttpStatus.INTERNAL_SERVER_ERROR.value())
				.title("Internal Server Error Exception, check the documentation.").details(serverError.getMessage())
				.developerMessage(serverError.getClass().getName()).path(request.getRequestURI()).build(),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
}