package com.knewless.core.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class StudentSubscriptionDto {
    private UUID id;
    private String name;
    private int lectures;
    private String avatar;
    private boolean isFollow;
}
