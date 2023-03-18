package org.greenspark404.service;

import lombok.RequiredArgsConstructor;
import org.greenspark404.model.GameSession;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class GameSessionStorage {
    private final CacheManager cacheManager;

    @Cacheable(value = "gameSession")
    public GameSession startSession(String sessionId) {
        return new GameSession(sessionId);
    }

    @Cacheable(value = "gameSession")
    public GameSession getSession(String sessionId) {
        throw new IllegalStateException("Session missing in the cache. This probably should never happened");
    }

    @CacheEvict(value = "gameSession")
    public void closeSession(String sessionId) {
    }

    public List<GameSession> getSessionList() {
        CaffeineCache cache = (CaffeineCache) cacheManager.getCache("gameSession");
        return Objects.requireNonNull(cache).getNativeCache().asMap()
                .values().stream().map(GameSession.class::cast).toList();
    }

}
