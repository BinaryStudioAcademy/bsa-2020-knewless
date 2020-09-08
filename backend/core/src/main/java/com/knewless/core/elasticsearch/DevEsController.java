package com.knewless.core.elasticsearch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@Profile("DEV")
@RestController
@Slf4j
public class DevEsController {
	private final DevEsService devEsService;
	@Value("${test.notification.token}")
	private String secret;
	
	@Autowired
	public DevEsController(DevEsService devEsService) {
		this.devEsService = devEsService;
	}
	
	
	@GetMapping("/es/sync")
	public void synchronise(@RequestHeader(name = "X-CONTROL-TOKEN") String token) {
		if (!secret.equals(token)) {
			log.warn("Tried to sync with wrong X-CONTROL-TOKEN {}", token);
			return;
		}
		log.info("Syncing ES with storage...");
		devEsService.syncWithStorage();
	}
}
