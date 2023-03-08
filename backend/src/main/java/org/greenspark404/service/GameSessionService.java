package org.greenspark404.service;

import org.greenspark404.model.GameSession;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameSessionService {

    @Cacheable(value="gameSession", key="#root.target.id")
    public GameSession startSession() {
        return new GameSession(UUID.randomUUID().toString());
    }

    @Cacheable(value="gameSession", key="sessionId")
    public GameSession getSession(String sessionId) {
        throw new IllegalStateException("Session missing in the cache. This probably should never happened");
    }

    @CacheEvict(value="gameSession", key="sessionId")
    public void closeSession(String sessionId) {}

}
