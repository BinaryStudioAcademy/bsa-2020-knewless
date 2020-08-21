package com.knewless.core.auth.Dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SavePasswordDtoRequest {
    private UUID resetId;
    private String password;
}
