package com.guilhermef.br.handler;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.guilhermef.br.exceptions.BadRequestException;
import com.guilhermef.br.exceptions.DuplicateResourceException;
import com.guilhermef.br.exceptions.InternalServerErrorException;
import com.guilhermef.br.exceptions.InvalidTokenException;
import com.guilhermef.br.exceptions.ResourceNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class RestControllerHandler {

	private static final Logger log = LoggerFactory.getLogger(RestControllerHandler.class);

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiErrorResponse> handleResourceNotFound(ResourceNotFoundException exception, HttpServletRequest request) {
		return build(HttpStatus.NOT_FOUND, "Not Found", exception.getMessage(), request);
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ApiErrorResponse> handleBadRequest(BadRequestException exception, HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Bad Request", exception.getMessage(), request);
	}

	@ExceptionHandler(DuplicateResourceException.class)
	public ResponseEntity<ApiErrorResponse> handleDuplicate(DuplicateResourceException exception, HttpServletRequest request) {
		return build(HttpStatus.CONFLICT, "Conflict", exception.getMessage(), request);
	}

	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<ApiErrorResponse> handleInvalidToken(InvalidTokenException exception, HttpServletRequest request) {
		return build(HttpStatus.UNAUTHORIZED, "Unauthorized", exception.getMessage(), request);
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ApiErrorResponse> handleAuthentication(AuthenticationException exception, HttpServletRequest request) {
		return build(HttpStatus.UNAUTHORIZED, "Unauthorized", "Invalid credentials.", request);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException exception, HttpServletRequest request) {
		String message = exception.getBindingResult().getFieldErrors().stream()
				.map(error -> error.getField() + ": " + error.getDefaultMessage())
				.collect(Collectors.joining(", "));
		return build(HttpStatus.BAD_REQUEST, "Validation Error", message, request);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException exception, HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Bad Request", "Invalid parameter: " + exception.getName(), request);
	}

	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<ApiErrorResponse> handleMissingParameter(MissingServletRequestParameterException exception, HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Bad Request", "Missing parameter: " + exception.getParameterName(), request);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ApiErrorResponse> handleNotReadable(HttpMessageNotReadableException exception, HttpServletRequest request) {
		return build(HttpStatus.BAD_REQUEST, "Bad Request", "Malformed request body.", request);
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<ApiErrorResponse> handleMethodNotSupported(HttpRequestMethodNotSupportedException exception, HttpServletRequest request) {
		return build(HttpStatus.METHOD_NOT_ALLOWED, "Method Not Allowed", "Method not allowed for this endpoint.", request);
	}

	@ExceptionHandler(InternalServerErrorException.class)
	public ResponseEntity<ApiErrorResponse> handleInternalServerError(InternalServerErrorException exception, HttpServletRequest request) {
		log.error("internal server error path={}", request.getRequestURI());
		return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "Unexpected error occurred.", request);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiErrorResponse> handleUnexpected(Exception exception, HttpServletRequest request) {
		log.error("unexpected error path={} type={}", request.getRequestURI(), exception.getClass().getName());
		return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "Unexpected error occurred.", request);
	}

	private ResponseEntity<ApiErrorResponse> build(HttpStatus status, String error, String message, HttpServletRequest request) {
		ApiErrorResponse body = new ApiErrorResponse(
				LocalDateTime.now(ZoneOffset.UTC),
				status.value(),
				error,
				message,
				request.getRequestURI()
		);
		return ResponseEntity.status(status).body(body);
	}
}