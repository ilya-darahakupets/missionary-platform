package by.dorogokupets.missionary.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException exc) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Unable to upload. File is too large!");
  }

  @ExceptionHandler(ServiceException.class)
  public ResponseEntity<String> handleMaxSizeException(ServiceException exc) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Server Error");
  }
}
