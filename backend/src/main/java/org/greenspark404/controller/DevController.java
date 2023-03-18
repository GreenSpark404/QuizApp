package org.greenspark404.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("dev")
@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
public class DevController {
    private final SimpMessagingTemplate webSocket;

    @PostMapping("/send-ws-message")
    public String sendWebsocketMessage(@RequestBody String message) {
        webSocket.convertAndSend("/dev", message);
        return message;
    }
}
