package by.dorogokupets.missionary.service.impl;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.mapper.UserMapper;
import by.dorogokupets.missionary.service.UserService;
import by.dorogokupets.missionary.repository.UserRepository;
import by.dorogokupets.missionary.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
  private UserRepository userRepository;

  private final UserMapper userMapper;

  private final UserValidator userValidator;


  @Autowired
  public UserServiceImpl(UserRepository userRepository,
                         UserMapper userMapper,
                        UserValidator userValidator ) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
    this.userValidator = userValidator;
  }

  @Override
  public boolean login(String login, String password) {
    boolean match = false;
//    User user = userRepository.findByLogin(login);
//    if (user != null) {
//      if (userValidator.isValidLogin(login) && userValidator.isValidPassword(password)) {
//      match = passwordEncoder.matches(password, user.getPassword());
//      }
//    }
    return match;
  }
  @Override
  public void deleteUserById(Long idUser) {
    userRepository.deleteById(idUser);
  }

  @Override
  public User register(UserDto userDto) throws ServiceException {
    User newUser = userMapper.mapToUser(userDto);
    newUser.setRole("client");
    return userRepository.save(newUser);
  }
  @Override
  public String getMessageIfUserIsPresent(UserDto userDto) {
//    User existingUser = userRepository.findByLogin(userDto.getLogin());
//    String message;
//    if (existingUser != null) {
//      message="Пользователь с таким логином уже есть!";
//      return message;
//    }

    return null;
  }


  @Override
  public Page<User> findAll(int pageNo, int pageSize, String sortBy, String sortDirection) {
    Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
    Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
    return userRepository.findAll(pageable);
  }

//  @Override
//  public User findByLogin(String login) throws ServiceException {
//    User user = userRepository.findByLogin(login);
//    if (user != null) {
//      return user;
//    } else {
//      throw new ServiceException("Failed find user by login");
//    }
//  }

  @Override
  public User findByUserId(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  @Override
  public User findByNameAndSurname(String firstName, String lastName, String patronymic) {
    return null;
  }

//  @Override
//  public User findByNameAndSurname(String firstName, String lastName) {
//    return userRepository.findByFirstNameAndLastName(firstName, lastName);
//  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public void updateUser(UserDto userDto) throws ServiceException {
    User updatedUser = userMapper.mapToUser(userDto);



    userRepository.save(updatedUser);
  }


  @Override
  public UserDto findUserDtoById(Long id) {
    Optional<User> user = userRepository.findById(id);
    return user.map(userMapper::mapToUserDto).orElse(null);
  }

}
