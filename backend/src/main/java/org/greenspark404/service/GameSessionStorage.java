package org.greenspark404.service;

import org.greenspark404.model.GameSession;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
public class GameSessionStorage {

    @Cacheable(value="gameSession")
    public GameSession startSession(String sessionId) {
        return new GameSession(sessionId);
    }

    @Cacheable(value="gameSession")
    public GameSession getSession(String sessionId) {
        throw new IllegalStateException("Session missing in the cache. This probably should never happened");
    }

    @CacheEvict(value="gameSession")
    public void closeSession(String sessionId) {}

}
