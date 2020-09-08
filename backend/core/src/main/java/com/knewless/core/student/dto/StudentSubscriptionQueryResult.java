package com.knewless.core.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class StudentSubscriptionQueryResult {
    private UUID id;
    private String name;
    private String avatar;
}
