package com.knewless.core.emailservice.Dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class TemporaryDto {
    private UUID id;
    private UUID userId;
    private Date createdAt;
    private DtoType type;
}
