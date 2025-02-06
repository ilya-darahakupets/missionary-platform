package by.dorogokupets.missionary.domain.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {

  private Long userId;

  private String login;

  private String password;

  private String firstName;

  private String lastName;

  private String role;

}
