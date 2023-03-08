package org.greenspark404.jwt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum JwtConstants {
    JWT_AUTH_COOKIE("JWT_AUTH_TOKEN");

    private final String value;

}
