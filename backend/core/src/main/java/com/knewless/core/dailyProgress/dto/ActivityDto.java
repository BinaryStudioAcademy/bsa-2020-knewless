package com.knewless.core.dailyProgress.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class ActivityDto {
    private LocalDate date;
    private int seconds;
}
