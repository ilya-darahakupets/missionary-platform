package by.dorogokupets.missionary.validator;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.validator.matches.PasswordMatches;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, UserDto> {

  @Override
  public boolean isValid(UserDto userDto, ConstraintValidatorContext context) {
    return userDto.getPassword().equals(userDto.getMatchingPassword());
  }
}
