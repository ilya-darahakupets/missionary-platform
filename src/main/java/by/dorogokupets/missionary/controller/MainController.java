package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import jakarta.servlet.http.HttpSession;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;

import static by.dorogokupets.missionary.controller.RequestAttributeName.*;

@Controller
public class MainController {
  private static Logger logger = LogManager.getLogger();


  @Autowired
  public MainController() {

  }

  @GetMapping("/missionary")
  public String showHomePage(Model model, HttpSession session) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication instanceof AnonymousAuthenticationToken) {

      model.addAttribute("username", "Guest");
      model.addAttribute("isAdmin", false);
    } else if (authentication != null && authentication.isAuthenticated()) {

      String username = authentication.getName();
      boolean isAdmin = authentication.getAuthorities().stream()
              .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
      model.addAttribute("username", username);
      model.addAttribute("isAdmin", isAdmin);
    } else {

      model.addAttribute("username", "Unknown");
      model.addAttribute("isAdmin", false);
    }
    return "main-page";
  }

  @GetMapping("/missionary/login")
  public String showLoginPage(Model model, HttpSession session) {
    logger.log(Level.INFO, "Переход на страницу входа");
    return "login-page";
  }

  @GetMapping("/missionary/registration")
  public String showRegistrationPage(Model model, HttpSession session) {
    model.addAttribute("user", new UserDto());
    logger.log(Level.INFO, "Переход на страницу регистрации");
    return "reg-page";
  }
  @GetMapping("/missionary/contacts")
  public String showContactPage(Model model, HttpSession session) {
    logger.log(Level.INFO, "Переход на страницу контактов");
    return "contacts-page";
  }
  @GetMapping("/missionary/services")
  public String showServicePage(Model model, HttpSession session) {
    logger.log(Level.INFO, "Переход на страницу услуг");
    return "services-page";
  }

  @GetMapping("/missionary/aboutUs")
  public String showAboutUsPage(Model model, HttpSession session) {
    logger.log(Level.INFO, "Connect");
    return "about-us";
  }

}
