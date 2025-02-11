package by.dorogokupets.missionary.config;

import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByLogin(login);
    return user.map(MyUserDetails::new).orElseThrow(()->new UsernameNotFoundException(login+ "There is not such user in repository"));
  }


}
