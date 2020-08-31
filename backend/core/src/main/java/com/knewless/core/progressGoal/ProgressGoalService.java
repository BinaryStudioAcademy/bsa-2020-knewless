package com.knewless.core.progressGoal;

import com.knewless.core.progressGoal.dto.ProgressGoalBriefDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProgressGoalService {
	private final ProgressGoalRepository repository;

	@Autowired
	public ProgressGoalService(ProgressGoalRepository repository) {
		this.repository = repository;
	}

	public List<ProgressGoalBriefDto> getAll() {
		return repository.findAll().stream().map(goal -> ProgressGoalBriefDto.builder()
				.id(goal.getId()).name(goal.getName()).build()).collect(Collectors.toList());
	}
}
