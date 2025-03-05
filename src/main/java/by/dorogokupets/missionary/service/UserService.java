package by.dorogokupets.missionary.service;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserService {

  void deleteUserById(Long aLong);

  Page<User> findAll(int pageNo, int pageSize, String sortBy, String sortDirection);

  Optional<User> findByEmail(String email) throws ServiceException;

  User findByUserId(Long userId);

  User findByNameAndSurname(String firstName, String lastName);

  @Transactional(rollbackFor = Exception.class)
  User updateUser(UserDto userDto) throws ServiceException;

  UserDto findUserDtoById(Long id);

  User getCurrentUser();
}
