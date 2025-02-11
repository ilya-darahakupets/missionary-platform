package by.dorogokupets.missionary.validator;

import by.dorogokupets.missionary.validator.matches.PasswordMatches;

@PasswordMatches
public class PasswordValidation {
  private String password;
  private String matchingPassword;

  public PasswordValidation(String password, String matchingPassword) {
    this.password = password;
    this.matchingPassword = matchingPassword;
  }
}

