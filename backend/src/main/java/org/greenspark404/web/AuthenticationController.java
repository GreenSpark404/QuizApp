package org.greenspark404.web;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.greenspark404.jwt.JwtConstants;
import org.greenspark404.jwt.JwtTokenProvider;
import org.greenspark404.model.dto.CredentialDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationProvider authenticationProvider;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody CredentialDTO credential, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(credential.getUsername(), credential.getPassword());
        Authentication authentication = authenticationProvider.authenticate(authenticationToken);
        if (!authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
        }
        Cookie authCookie = new Cookie(JwtConstants.JWT_AUTH_COOKIE.getValue(), tokenProvider.createToken(authentication));
        response.addCookie(authCookie);
        return ResponseEntity.ok().build();
    }

    @PostMapping("{sessionId}/register")
    public void registerPlayer(@RequestParam String sessionId, @RequestBody String playerName) {
    }

}
