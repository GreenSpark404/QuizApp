package org.greenspark404.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenspark404.jwt.JwtConstants;
import org.greenspark404.jwt.JwtTokenProvider;
import org.greenspark404.model.domain.GameSession;
import org.greenspark404.model.domain.Player;
import org.greenspark404.model.domain.Roles;
import org.greenspark404.model.dto.AuthDTO;
import org.greenspark404.model.dto.PlayerDTO;
import org.greenspark404.component.GameSessionStorage;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationProvider authenticationProvider;
    private final JwtTokenProvider tokenProvider;
    private final GameSessionStorage gameSessionStorage;

    @PostMapping("login")
    public void login(@RequestBody AuthDTO credential, HttpServletResponse response) throws IOException {
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(credential.getUsername(), credential.getPassword());
            Authentication authentication = authenticationProvider.authenticate(authenticationToken);
            ((CredentialsContainer) authentication.getPrincipal()).eraseCredentials();
            Cookie authCookie = new Cookie(JwtConstants.JWT_AUTH_COOKIE.getValue(), tokenProvider.createToken(authentication));
            authCookie.setPath("/");
            response.addCookie(authCookie);
        } catch (Exception e) {
            log.debug("Authentication failed.", e);
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Bad credentials");
        }
    }

    @PostMapping("{sessionId}/register")
    public void registerPlayer(@PathVariable String sessionId,
                               @RequestBody @Validated PlayerDTO playerDTO,
                               HttpServletResponse response
    ) {
        GameSession session = gameSessionStorage.getSession(sessionId);
        Player player = new Player(UUID.randomUUID().toString());
        player.setName(playerDTO.getName());
        var authenticationToken = new UsernamePasswordAuthenticationToken(player.getName(), null,
                Stream.of("ROLE_" + Roles.PLAYER.name()).map(SimpleGrantedAuthority::new).toList()
        );
        authenticationToken.setDetails(
                Map.of(
                        "playerId", player.getId()
                )
        );
        Cookie authCookie = new Cookie(JwtConstants.JWT_AUTH_COOKIE.getValue(), tokenProvider.createToken(authenticationToken));
        authCookie.setPath("/");
        response.addCookie(authCookie);
        session.getPlayerMap().put(player.getId(), player);
        session.getScoreboardMap().put(player, 0);
    }

}
