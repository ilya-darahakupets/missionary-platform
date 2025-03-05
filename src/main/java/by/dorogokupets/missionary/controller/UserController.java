package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.mapper.UserMapper;
import by.dorogokupets.missionary.service.UserService;
import jakarta.validation.Valid;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class UserController {
  private static Logger logger = LogManager.getLogger();
  private final UserService userService;
  private final UserMapper userMapper;


  @Autowired
  public UserController(UserService userService,UserMapper userMapper) {
    this.userService = userService;
    this.userMapper = userMapper;
  }

  @GetMapping("/missionary/admin/users")
  public String showUsers(
          @RequestParam(defaultValue = "1") int page,
          @RequestParam(defaultValue = "lastName") String sortBy,
          @RequestParam(defaultValue = "ASC") String sortDirection,
          Model model
  ) {
    Page<User> userPage = userService.findAll(page - 1, 7, sortBy, sortDirection);

    model.addAttribute(RequestAttributeName.USER_PAGE, userPage);
    return "users";
  }

  @GetMapping("/missionary/profile")
  public String showProfile(Model model) {
    User user = userService.getCurrentUser();
    model.addAttribute("user",userMapper.mapToUserDto(user));
    return "user-profile";
  }

  @GetMapping("/missionary/edit/profile")
  public String showEditProfileForm(Model model) {
    User user = userService.getCurrentUser();
    model.addAttribute("user",userMapper.mapToUserDto(user));
    return "edit-user";
  }


  @PostMapping("/missionary/edit/profile/update")
  public String updateProfile(
          @Valid @ModelAttribute("user") UserDto userDto,
          BindingResult result,
          RedirectAttributes redirectAttributes
  ) {
    if (result.hasErrors()) {
      return "edit-user";
    }

    try {
      User updatedUser = userService.updateUser(userDto);

      Authentication authentication = new UsernamePasswordAuthenticationToken(
              updatedUser.getEmail(),
              updatedUser.getPassword(),
              SecurityContextHolder.getContext().getAuthentication().getAuthorities()
      );
      SecurityContextHolder.getContext().setAuthentication(authentication);

      redirectAttributes.addFlashAttribute("success", "Profile updated!");
    } catch (ServiceException e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
    }

    return "redirect:/missionary/profile";
  }

  @GetMapping("/missionary/admin/panel")
  public String showAdminPage(Model model) {
    logger.log(Level.INFO, "Переход на страницу администратора");
    return "admin-page";
  }


}
