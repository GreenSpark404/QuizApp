package org.greenspark404.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = Optional.ofNullable(request.getCookies()).orElse(new Cookie[]{});
        Cookie authCookie = Arrays.stream(cookies)
                .filter(cookie -> StringUtils.equals(JwtConstants.JWT_AUTH_COOKIE.getValue(), cookie.getName()))
                .findFirst().orElse(null);
        if (authCookie != null) {
            try {
                Claims claims = tokenProvider.readToken(authCookie.getValue()).getBody();
                Collection<?> rolesRaw = claims.get("roles", Collection.class);
                var authorities =
                        rolesRaw.stream().map(String::valueOf).map(SimpleGrantedAuthority::new).toList();
                var authenticationToken =
                        new UsernamePasswordAuthenticationToken(claims.get("name"), null, authorities);
                authenticationToken.setDetails(claims.get("details"));
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(authenticationToken);
                authCookie.setValue(tokenProvider.createToken(authenticationToken));
                response.addCookie(authCookie);
            } catch (Exception e) {
                log.error(ExceptionUtils.getRootCauseMessage(e));
                response.sendError(HttpStatus.UNAUTHORIZED.value());
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
