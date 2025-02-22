package by.dorogokupets.missionary.repository;

import by.dorogokupets.missionary.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findById(Long userId);

  User findByEmail(String email);

  Optional<User> findByFirstName(String firstname);


  User findByFirstNameAndLastName(String firstName, String lastName);

}
