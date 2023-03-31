package org.greenspark404.service;

import lombok.RequiredArgsConstructor;
import org.greenspark404.mapper.GameSessionMapper;
import org.greenspark404.model.domain.GameSession;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketService {
    private final SimpMessagingTemplate webSocket;
    private final GameSessionMapper gameSessionMapper;

    public void notifyGmSessionUpdated(GameSession gameSession) {
        String destination = "/gm/sessionUpdated/" + gameSession.getId();
        webSocket.convertAndSend(destination, new GenericMessage<>(gameSessionMapper.toDto(gameSession)));
    }
}
