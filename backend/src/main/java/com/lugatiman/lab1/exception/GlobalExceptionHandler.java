package com.lugatiman.lab1.exception;

import com.lugatiman.lab1.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Get the first error to keep the message concise
        String errorMessage = "Validation failed";
        if (!ex.getBindingResult().getAllErrors().isEmpty()) {
            errorMessage = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        }

        return new ResponseEntity<>(new ApiResponse(false, errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGlobalException(Exception ex) {
        return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
