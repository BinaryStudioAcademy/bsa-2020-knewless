package com.knewless.core.student.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class StudentMainInfoDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String avatar;
    private String job;
}
