package com.knewless.core.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
public class WebSocketConnectionController {

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    private ActiveUserManager activeSessionManager;

    @PostMapping("/user-connect")
    public String userConnect(HttpServletRequest request,
                              @RequestParam("username") String userName) {
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("Remote_Addr");
            if (StringUtils.isEmpty(remoteAddr)) {
                remoteAddr = request.getHeader("X-FORWARDED-FOR");
                if (remoteAddr == null || "".equals(remoteAddr)) {
                    remoteAddr = request.getRemoteAddr();
                }
            }
        }

        activeSessionManager.add(userName, remoteAddr);
        return userName;
    }

    @PostMapping("/user-disconnect")
    public String userDisconnect(@RequestParam("username") String userName) {
        activeSessionManager.remove(userName);
        return "disconnected";
    }

    @GetMapping("/notify")
    public NotificationDto testSockets(){
        var notification = new NotificationDto("text", "link", "source");
        template.convertAndSendToUser("aab", "/queue/notification", notification);
        return notification;
    }
}
