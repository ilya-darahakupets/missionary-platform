package by.dorogokupets.missionary.validator;

import by.dorogokupets.missionary.domain.dto.UserDto;



public interface UserValidator {


    boolean isValidUser(UserDto userDto);

    boolean isValidLogin(String login);

    boolean isValidPassword(String password);

    boolean isValidFirstName(String name);

    boolean isValidLastName(String surname);

    boolean isValidPhone(String phone);
}
