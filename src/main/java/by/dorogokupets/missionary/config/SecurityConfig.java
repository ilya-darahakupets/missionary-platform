package by.dorogokupets.missionary.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
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
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig implements WebSecurityConfigurer {
  @Autowired
  private MyUserDetailsService userDetailsService;

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
            .authenticationProvider(authenticationProvider())
            .csrf(csrf -> csrf
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            )
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "/missionary/aboutUs",
                            "/missionary",
                            "/missionary/contacts",
                            "/missionary/registration",
                            "/missionary/supports",
                            "/missionary/countries/**",
                            "/css/**",
                            "/js/**",
                            "/bootstrap/**",
                            "/reg-page/**",
                            "/scss/**",
                            "/images/**").permitAll()
                    .requestMatchers("/missionary/admin/**").hasRole("ADMIN")
                    .requestMatchers("/missionary/profile").authenticated()
                    .anyRequest().authenticated())
            .formLogin(form -> form
                    .usernameParameter("email").passwordParameter("password")
                    .loginPage("/missionary/login")
                    .loginProcessingUrl("/missionary/authenticate")
                    .defaultSuccessUrl("/missionary", true)
                    .failureUrl("/page/login?loginError=true")
            )
            .headers(headers -> headers
//                    .contentSecurityPolicy(csp -> csp
//                            .policyDirectives("default-src 'self'")
//                    )
                    .xssProtection(xss -> xss
                            .headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK)
                    )
                    .httpStrictTransportSecurity(hsts -> hsts
                            .includeSubDomains(true)
                            .preload(true)
                            .maxAgeInSeconds(31536000)
                    )
            )
            .rememberMe((remember) -> remember
                    .key("001304-123-414-149rmmbr-key")
                    .tokenValiditySeconds(43200*2)
                    .rememberMeParameter("remember-me-login")
                    .rememberMeCookieName("SECURE_REMEMBER_ME")
                    .userDetailsService(userDetailsService)
                    .useSecureCookie(true)
            )
            .logout(logout -> logout
                    .logoutUrl("/missionary/logout")
                    .logoutSuccessUrl("/missionary/login")
                    .permitAll()
                    .deleteCookies("JSESSIONID", "SECURE_REMEMBER_ME"))
            .build();
  }


  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }



  @Override
  public void init(SecurityBuilder builder) throws Exception {

  }

  @Override
  public void configure(SecurityBuilder builder) throws Exception {

  }
}