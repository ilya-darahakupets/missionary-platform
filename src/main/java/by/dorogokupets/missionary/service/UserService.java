package by.dorogokupets.missionary.service;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import org.springframework.data.domain.Page;

public interface UserService {
  boolean login(String login, String password);

  void deleteUserById(Long aLong);

  User register(UserDto userDto) throws ServiceException;

  String getMessageIfUserIsPresent(UserDto userDto);

  Page<User> findAll(int pageNo, int pageSize, String sortBy, String sortDirection);

//  User findByEmail(String email);
//  User findByLogin(String login) throws ServiceException;

  User findByUserId(Long userId);

  User findByNameAndSurname(String firstName, String lastName, String patronymic);

  void updateUser(UserDto userDto) throws ServiceException;

  UserDto findUserDtoById(Long id);
}
