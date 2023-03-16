package org.greenspark404.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class JwtTokenProvider {
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String createToken(Authentication auth) {
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(15);
        return Jwts.builder()
                .claim("principal", auth.getPrincipal())
                .claim("roles", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .claim("details", auth.getDetails())
                .signWith(secretKey)
                .setExpiration(Date.from(expirationTime.atZone(ZoneId.systemDefault()).toInstant()))
                .compact();
    }

    public Jws<Claims> readToken(String token) {
        JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(secretKey).build();
        return jwtParser.parseClaimsJws(token);
    }
}
