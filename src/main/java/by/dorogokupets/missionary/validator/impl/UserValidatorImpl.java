package by.dorogokupets.missionary.validator.impl;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.validator.UserValidator;
import org.springframework.stereotype.Component;

@Component
public class UserValidatorImpl implements UserValidator {
  // только латинские буквы (в верхнем и нижнем регистре) и цифры, Длина от 4 до 20 символов.
  public static final String LOGIN_REGEX = "^[a-zA-Z0-9]{4,20}$";

  //только латинские буквы (в верхнем и нижнем регистре).
//Длина строки от 2 до 30 символов.
  public static final String FIRST_NAME_REGEX = "^[А-ЯЁа-яёA-Za-z]{2,40}$";
  public static final String LAST_NAME_REGEX = "^[А-ЯЁа-яёA-Za-z]{2,40}$";
  public static final String PATRONYMIC_REGEX = "^[А-ЯЁа-яёA-Za-z]{2,40}$";
  public static final String PHONE_REGEX = "^\\s*\\+?375((25|29|33|44)\\d{7})\\s*$";

  //Должен содержать как минимум одну заглавную (большую) букву (A-Z).
//Должен содержать как минимум одну строчную (маленькую) букву (a-z).
//Должен содержать как минимум одну цифру (0-9).
//Длина строки должна быть от 6 до 30 символов.
//Допускаются только латинские буквы и цифры.
  public static final String PASSWORD_REGEX = "(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{6,30}";


  @Override
  public boolean isValidUser(UserDto userDto) {
    return userDto.getFirstName() != null && userDto.getFirstName().matches(FIRST_NAME_REGEX) &&
            userDto.getLastName() != null && userDto.getLastName().matches(LAST_NAME_REGEX) &&
            userDto.getLogin() != null && userDto.getLogin().matches(LOGIN_REGEX) &&
            userDto.getPassword() != null && userDto.getPassword().matches(PASSWORD_REGEX);
  }

//    @Override
//    public boolean isValidLogin(String login) {
//        return true;
//    }
//
//    @Override
//    public boolean isValidPassword(String password) {
//        return true;
//    }

  @Override
  public boolean isValidLogin(String login) {
    return login != null && login.matches(LOGIN_REGEX);
  }

  @Override
  public boolean isValidPassword(String password) {
    return password != null && password.matches(PASSWORD_REGEX);
  }

  @Override
  public boolean isValidFirstName(String name) {
    return name != null && name.matches(FIRST_NAME_REGEX);
  }

  @Override
  public boolean isValidLastName(String surname) {
    return surname != null && surname.matches(LAST_NAME_REGEX);
  }

  @Override
  public boolean isValidPhone(String phone) {
    return phone != null && phone.matches(PHONE_REGEX);
  }


}
