package by.dorogokupets.missionary.domain.dto;

import jakarta.validation.constraints.Email;
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
public class UserDto {
  @NotNull
  @NotEmpty
  private Long userId;
  @NotNull
  @NotEmpty
  private String email;
  @NotNull
  @NotEmpty
  private String password;
  @NotNull
  @NotEmpty
  private String matchingPassword;
  @NotNull
  @NotEmpty
  private String firstName;
  @NotNull
  @NotEmpty
  @Email(message = "Invalid email format")
  private String lastName;
  @NotNull
  @NotEmpty
  private String role;

}
