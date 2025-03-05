package by.dorogokupets.missionary.validator;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.validator.matches.PasswordMatches;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, UserDto> {

  @Override
  public boolean isValid(UserDto userDto, ConstraintValidatorContext context) {
    if (userDto.getPassword() == null && userDto.getMatchingPassword() == null) {
      return true;
    }
    return userDto.getPassword() != null
            && userDto.getPassword().equals(userDto.getMatchingPassword());
  }
}
