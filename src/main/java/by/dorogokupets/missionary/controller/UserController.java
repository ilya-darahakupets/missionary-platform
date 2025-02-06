package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.service.UserService;
import by.dorogokupets.missionary.validator.UserValidator;
import jakarta.servlet.http.HttpSession;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import static by.dorogokupets.missionary.controller.RequestAttributeName.*;

@Controller
public class UserController {
  private static Logger logger = LogManager.getLogger();
  private final UserService userService;

  private final UserValidator userValidator;


  @Autowired
  public UserController(UserService userService, UserValidator userValidator) {
    this.userService = userService;
    this.userValidator = userValidator;
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

  @GetMapping("/kid-shop/user/profile")
  public String userProfile(HttpSession session, Model model) {
    Long userId = (Long) session.getAttribute("userid");
    if (userId == null) {
      return "redirect:/kid-shop/login";
    }
    User user = userService.findByUserId(userId);
    model.addAttribute("user", user);
    return "user-profile";
  }


//  @PostMapping("/kid-shop/logout")
//  public String logout(HttpSession session) {
//    session.removeAttribute("userId");
//    session.removeAttribute("userCart");
//    session.removeAttribute("user");
//    session.invalidate();
//    return "redirect:/kid-shop/login";
//  }

  @PostMapping(path = "/kid-shop/registration/save")
  public String registerUser(RedirectAttributes redirectAttributes, @ModelAttribute UserDto userDto) throws ServiceException {
    if (userService.getMessageIfUserIsPresent(userDto) == null) {
      if (userValidator.isValidUser(userDto)) {
        userService.register(userDto);
        redirectAttributes.addFlashAttribute(MESSAGE, "Вы успешно зарегистрировались");
        logger.log(Level.INFO, "Успешная регистрация пользователя: " + userDto.getFirstName() + " " + userDto.getLastName());
        return "redirect:/kid-shop/login";
      } else {
        redirectAttributes.addFlashAttribute(MESSAGE, "Неверные значения. Наведитесь на поля, чтобы посмотреть правила заполнения");
        logger.log(Level.INFO, "Ошибка регистрация пользователя: " + userDto.getFirstName() + " " + userDto.getLastName());
        return "redirect:/kid-shop/registration";
      }
    } else {
      redirectAttributes.addFlashAttribute(RequestAttributeName.MESSAGE, "Пользователь с таким логином уже существуют!");
      return "redirect:/kid-shop/registration";
    }
  }

  @GetMapping("/kid-shop/admin/user/add")
  public String showAddUserForm(Model model) {
    model.addAttribute(RequestAttributeName.USER_DTO, new UserDto());

    return "add-user-form";
  }

  @GetMapping("/kid-shop/admin/panel")
  public String showAdminPage(Model model) {
    logger.log(Level.INFO, "Переход на страницу администратора");
    return "admin-page";
  }

  @PostMapping(path = "/kid-shop/admin/user/add/save")
  public String addUser(RedirectAttributes redirectAttributes, @ModelAttribute UserDto userDto) throws ServiceException {
    if (userService.getMessageIfUserIsPresent(userDto) == null) {
      if (userValidator.isValidUser(userDto)) {
        userService.register(userDto);
        redirectAttributes.addFlashAttribute(RequestAttributeName.MESSAGE, "Пользователь добавлен успешно");
        logger.log(Level.INFO, "Пользователь добавлен: " + userDto.getFirstName() + " " + userDto.getLastName());
        return "redirect:/kid-shop/admin/users";
      } else {
        redirectAttributes.addFlashAttribute(MESSAGE, "Неверные значения. Наведитесь на поля, чтобы посмотреть правила заполнения");
        logger.log(Level.INFO, "Ошибка добавления пользователя: " + userDto.getFirstName() + " " + userDto.getLastName());
        return "redirect:/kid-shop/registration";
      }
    } else {
      redirectAttributes.addFlashAttribute(RequestAttributeName.MESSAGE, "Пользователь с таким логином уже существуют!");
      return "redirect:/kid-shop/registration";
    }

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
