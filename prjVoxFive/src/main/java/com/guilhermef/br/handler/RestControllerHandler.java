package com.guilhermef.br.handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
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

	@ExceptionHandler(InternalServerErrorException.class)
	public ResponseEntity<ExceptionDetails> handlerInternalServerErrorException(
			InternalServerErrorException serverError, HttpServletRequest request) {
		return buildException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", serverError.getMessage(),
				serverError.getClass().getName(), request.getRequestURI());
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<ExceptionDetails> handlerMethodNotSupportedException(
			HttpRequestMethodNotSupportedException methodNotSupported, HttpServletRequest request) {
		return buildException(HttpStatus.METHOD_NOT_ALLOWED, "Method Not Allowed",
				methodNotSupported.getMessage(), methodNotSupported.getClass().getName(), request.getRequestURI());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDetails> handlerGeneralException(
			Exception exception, HttpServletRequest request) {
		return buildException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error",
				exception.getMessage() != null ? exception.getMessage() : "Unexpected error occurred.",
				exception.getClass().getName(), request.getRequestURI());
	}
}