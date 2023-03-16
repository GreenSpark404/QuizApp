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
@RequestMapping("/api/util")
@RequiredArgsConstructor
public class WebSocketController {
    private final SimpMessagingTemplate webSocket;

    @PostMapping("/echo")
    public String echo(@RequestBody String message) {
        webSocket.convertAndSend("/echo", message);
        return message;
    }
}
