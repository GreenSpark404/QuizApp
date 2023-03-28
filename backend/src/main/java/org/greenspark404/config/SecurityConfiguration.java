package org.greenspark404.config;

import org.greenspark404.jwt.JwtRequestFilter;
import org.greenspark404.model.Roles;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        return authenticationProvider;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetailsManager userDetailsManager = new InMemoryUserDetailsManager();
        UserDetails user = User.withUsername("gameMaster")
                .password("{bcrypt}" + passwordEncoder().encode("quizMaster123"))
                .roles(Roles.GAME_MASTER.name()).build();
        userDetailsManager.createUser(user);
        return userDetailsManager;
    }

    @Bean
    @Profile("dev")
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    @Profile("!dev")
    public SecurityFilterChain filterChain(HttpSecurity http, JwtRequestFilter jwtRequestFilter) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/error").permitAll()
                .requestMatchers("/api/**").permitAll()
                .and().addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    @Profile("dev")
    public SecurityFilterChain devFilterChain(HttpSecurity http, JwtRequestFilter jwtRequestFilter) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests().requestMatchers("/**").permitAll()
                .and().addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
