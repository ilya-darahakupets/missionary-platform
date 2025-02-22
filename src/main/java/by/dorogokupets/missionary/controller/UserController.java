package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import springfox.documentation.spi.service.contexts.SecurityContext;

@Controller
public class UserController {
  private static Logger logger = LogManager.getLogger();
  private final UserService userService;


  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
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
  public String showUserProfile(Model model) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return "redirect:/missionary/login";
    }
    String email = authentication.getName();
    User user = null;
    try {
      user = userService.findByEmail(email);
    } catch (ServiceException e) {
      logger.log(Level.WARN, "User not found");
//      model.addAttribute("error", )
    }

    model.addAttribute("user", user);
    return "user-profile";
  }


  @PostMapping("/missionary/registration")
  public String registerUserAccount(@ModelAttribute("user") @Valid UserDto userDto, BindingResult result, Model model) {
    if (result.hasErrors()) {
      return "reg-page";
    }
    try {
      userService.registerNewUserAccount(userDto);
      return "redirect:/missionary/login?success";
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "reg-page";
    }
  }


  @GetMapping("/kid-shop/admin/panel")
  public String showAdminPage(Model model) {
    logger.log(Level.INFO, "Переход на страницу администратора");
    return "admin-page";
  }

  @GetMapping("/kid-shop/admin/user/edit/{id}")
  public String showEditForm(@PathVariable("id") Long userId, Model model) {
    UserDto userDTO = userService.findUserDtoById(userId);

    return "edit-user";
  }

  @GetMapping("/kid-shop/user/edit/{id}")
  public String showEditProfileForm(@PathVariable("id") Long userId, Model model) {
    UserDto userDTO = userService.findUserDtoById(userId);
    model.addAttribute(RequestAttributeName.USER_DTO, userDTO);

    return "edit-user-profile";
  }

  @PostMapping(path = "/kid-shop/admin/user/update")
  public String updateUser(@ModelAttribute UserDto userDTO, RedirectAttributes redirectAttributes) throws ServiceException {
    userService.updateUser(userDTO);
    redirectAttributes.addFlashAttribute(RequestAttributeName.MESSAGE, "Пользователь успешно изменен");
    return "redirect:/kid-shop/admin/users";
  }

  @PostMapping(path = "/kid-shop/user/update")
  public String updateUserInfo(@ModelAttribute UserDto userDTO, RedirectAttributes redirectAttributes) throws ServiceException {
    userService.updateUser(userDTO);
    redirectAttributes.addFlashAttribute(RequestAttributeName.MESSAGE, "Вы успешно изменили профиль");
    return "redirect:/kid-shop/user/profile";
  }

  @GetMapping("/kid-shop/admin/user/delete/{id}")
  public String deleteUser(@PathVariable("id") Long userId, RedirectAttributes redirectAttributes) {
    userService.deleteUserById(userId);
    redirectAttributes.addFlashAttribute(RequestAttributeName.MESSAGE, "Пользователь (id=" + userId + ") успешно удален");
    return "redirect:/kid-shop/admin/users";
  }

}
