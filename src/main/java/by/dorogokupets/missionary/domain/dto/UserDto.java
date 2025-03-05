package by.dorogokupets.missionary.domain.dto;

import by.dorogokupets.missionary.validator.matches.PasswordMatches;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@PasswordMatches
public class UserDto {

  private Long userId;

  @NotBlank(message = "Email is required")
  @Email(message = "Invalid email format")
  private String email;

  private String password;

  private String matchingPassword;

  @NotBlank(message = "First name is required")
  private String firstName;

  @NotBlank(message = "Last name is required")
  private String lastName;

  @Hidden
  private String role;

}
