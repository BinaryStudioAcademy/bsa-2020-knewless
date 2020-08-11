package com.knewless.core.author.dto;

import org.springframework.beans.factory.annotation.Value;

public interface AuthorNameIdProjection {
    @Value("#{target.last_name}")
    String getLastName();

    @Value("#{target.fisrt_name}")
    String getFirstName();

    String getId();
}
