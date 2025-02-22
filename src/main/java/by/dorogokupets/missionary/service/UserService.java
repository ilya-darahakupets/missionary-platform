package by.dorogokupets.missionary.service;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import org.springframework.data.domain.Page;

public interface UserService {
  void registerNewUserAccount(UserDto userDto) throws ServiceException;

  void deleteUserById(Long aLong);


  String getMessageIfUserIsPresent(UserDto userDto);

  Page<User> findAll(int pageNo, int pageSize, String sortBy, String sortDirection);

  User findByEmail(String email) throws ServiceException;

  User findByUserId(Long userId);

  User findByNameAndSurname(String firstName, String lastName, String patronymic);

  void updateUser(UserDto userDto) throws ServiceException;

  UserDto findUserDtoById(Long id);
}
