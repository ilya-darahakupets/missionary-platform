package by.dorogokupets.missionary.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.SecurityBuilder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig implements WebSecurityConfigurer {
  @Bean
  public UserDetailsService userDetailsService() {
    return new MyUserDetailsService();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "/missionary/aboutUs",
                            "/missionary",
                            "/missionary/contacts",
                            "/missionary/registration",
                            "/missionary/services",
                            "/css/**",
                            "/js/**",
                            "/bootstrap/**",
                            "/reg-page/**",
                            "/scss/**",
                            "/images/**").permitAll()
                    .requestMatchers("/missionary/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated())
            .formLogin(form -> form
                    .loginPage("/missionary/login")
                    .loginProcessingUrl("/missionary/authenticate")
                    .defaultSuccessUrl("/missionary", true)
            )
            .logout(logout -> logout
                    .logoutUrl("/missionary/logout")
                    .logoutSuccessUrl("/missionary/login")
                    .permitAll())
            .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(13);
  }



  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
  }

  @Override
  public void init(SecurityBuilder builder) throws Exception {

  }

  @Override
  public void configure(SecurityBuilder builder) throws Exception {

  }
}