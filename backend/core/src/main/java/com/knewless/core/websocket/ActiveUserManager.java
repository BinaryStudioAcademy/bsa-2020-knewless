package com.knewless.core.websocket;

import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class ActiveUserManager {

    private final Map<String, Object> map;


    private ActiveUserManager() {
        map = new ConcurrentHashMap<>();
    }

    public void add(String userName, String remoteAddress) {
        map.put(userName, remoteAddress);
    }

    public void remove(String username) {
        map.remove(username);
    }

    public Set<String> getAll() {
        return map.keySet();
    }

    public Set<String> getActiveUsersExceptCurrentUser(String username) {
        Set<String> users = new HashSet<>(map.keySet());
        users.remove(username);
        return users;
    }
}
