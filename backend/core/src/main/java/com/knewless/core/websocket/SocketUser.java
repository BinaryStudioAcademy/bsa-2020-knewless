package com.knewless.core.websocket;

import java.security.Principal;

public class SocketUser implements Principal {

    String name;

    public SocketUser(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
