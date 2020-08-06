package com.knewless.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication

public class CoreApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(CoreApplication.class, args);
	}

}
