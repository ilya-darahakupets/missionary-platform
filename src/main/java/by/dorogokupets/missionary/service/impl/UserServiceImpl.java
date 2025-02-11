package by.dorogokupets.missionary.service.impl;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.mapper.UserMapper;
import by.dorogokupets.missionary.service.UserService;
import by.dorogokupets.missionary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
//@Transactional
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;

  private final UserMapper userMapper;


  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository,
                         UserMapper userMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }

  public void registerNewUserAccount(UserDto userDto) throws Exception {
    if (userRepository.findByEmail(userDto.getEmail()) != null) {
      throw new Exception("Email already exists");
    }
    User user = new User();
    user.setFirstName(userDto.getFirstName());
    user.setLastName(userDto.getLastName());
    user.setEmail(userDto.getEmail());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    user.setRole(userDto.getRole());

    userRepository.save(user);
  }

  private boolean emailExists(String email) {
    return userRepository.findByEmail(email) != null;
  }

  @Override
  public void deleteUserById(Long idUser) {
    userRepository.deleteById(idUser);
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

  @Override
  public User findByEmail(String email) {
    return null;
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
