package com.knewless.core.author.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorShortDto {
    private String firstName;
    private String lastName;
    private UUID id;
}
