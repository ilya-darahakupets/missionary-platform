package by.dorogokupets.missionary.controller;

import lombok.AllArgsConstructor;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

//@RestController
//@RequestMapping("test/")
//@AllArgsConstructor
public class TestController {
   static Logger logger = LogManager.getLogger();
//  @GetMapping("/welcome")
//  public String welcome() {
//    return "This is unprotected page!";
//  }
//
//  @GetMapping("/users")
//  @PreAuthorize("hasAuthority('client')")
//  public String users() {
//    logger.log(Level.INFO, "clients page");
//    return "This is page only for clients!";
//  }
//
//  @GetMapping("/admins")
//  @PreAuthorize("hasAuthority('admin')")
//  public String admins() {
//    logger.log(Level.INFO, "admins page");
//    logger.info("admins page asas");
//    logger.warn("admins page warn");
//    return "This is page only for admins!";
//  }
//  @GetMapping("/all")
//  public String pageForAll() {
//    return "This is page for all!";
//  }
}
