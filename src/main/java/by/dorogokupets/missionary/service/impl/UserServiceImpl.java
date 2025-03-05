package by.dorogokupets.missionary.service.impl;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.mapper.UserMapper;
import by.dorogokupets.missionary.service.UserService;
import by.dorogokupets.missionary.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  private final UserMapper userMapper;


  private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

  @Autowired
  public UserServiceImpl(UserRepository userRepository,
                         UserMapper userMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }


  private boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  @Override
  public void deleteUserById(Long idUser) {
    userRepository.deleteById(idUser);
  }


  @Override
  public Page<User> findAll(int pageNo, int pageSize, String sortBy, String sortDirection) {
    Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
    Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
    return userRepository.findAll(pageable);
  }

  @Override
  public Optional<User> findByEmail(String email) throws ServiceException {
    return userRepository.findByEmail(email);
  }

  @Override
  public User findByUserId(Long userId) {
    return userRepository.findById(userId).orElse(null);
  }

  @Override
  public UserDto findUserDtoById(Long id) {
    Optional<User> user = userRepository.findById(id);
    return user.map(userMapper::mapToUserDto).orElse(null);
  }

  @Override
  public User findByNameAndSurname(String firstName, String lastName) {
    return userRepository.findByFirstNameAndLastName(firstName, lastName);
  }


  @Transactional(rollbackFor = Exception.class)
  @Override
  public User updateUser(UserDto userDto) throws ServiceException {
    User user = userRepository.findById(userDto.getUserId())
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

    if (!user.getEmail().equals(userDto.getEmail())) {
      if (emailExists(userDto.getEmail())) {
        throw new ServiceException("Email already exists");
      }
      user.setEmail(userDto.getEmail());
    }

    user.setFirstName(userDto.getFirstName());
    user.setLastName(userDto.getLastName());

    if (userDto.getPassword() != null
            && !userDto.getPassword().isEmpty()
            && userDto.getPassword().equals(userDto.getMatchingPassword())) {
      user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    }

    return userRepository.save(user);
  }

  @Override
  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new EntityNotFoundException("User is not authenticated");
    }

    String email = authentication.getName();
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
  }

}
