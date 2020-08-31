package com.knewless.core.progressGoal;

import com.knewless.core.progressGoal.dto.ProgressGoalBriefDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("goals")
public class ProgressGoalController {
	private final ProgressGoalService service;

	@Autowired
	public ProgressGoalController(ProgressGoalService service) {
		this.service = service;
	}

	@GetMapping
	public List<ProgressGoalBriefDto> getGoals() {
		return service.getAll();
	}
}
