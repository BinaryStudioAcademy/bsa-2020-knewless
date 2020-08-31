package com.knewless.core.student;

import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.student.dto.*;
import com.knewless.core.user.model.CurrentUser;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

	private final StudentService studentService;

	@Autowired
	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}

	@GetMapping
	public Optional<StudentSettingsDto> getSettings(@CurrentUser UserPrincipal userPrincipal) {
		return studentService.getStudentSettings(userPrincipal.getId());
	}

	@PostMapping
	public ResponseEntity<?> setSettings(@CurrentUser UserPrincipal userPrincipal,
										 @Valid @RequestBody StudentSettingsDto settings,
										 Errors validationResult) {
		if (validationResult.hasErrors()) {
			return ResponseEntity.badRequest()
					.body(new SingleMessageResponse(
									ValidationMessageCreator.createString(validationResult, " ")
							)
					);
		}
		final var currentUserId = userPrincipal.getId();
		if (currentUserId == null) {
			return ResponseEntity.badRequest().body(new SingleMessageResponse("User id cannot be null."));
		}
		settings.setUserId(currentUserId);
		final var savingResult = studentService.setStudentSettings(settings);
		if (savingResult.isPresent()) {
			return ResponseEntity.ok(new SingleMessageResponse("Success. Your profile has been updated."));
		}
		return new ResponseEntity<>(
				new SingleMessageResponse("An error occurred while saving changes."), HttpStatus.INTERNAL_SERVER_ERROR
		);
	}

	@GetMapping("/profile")
	public StudentProfileDto getStudentProfile(@CurrentUser UserPrincipal userPrincipal) {
		return studentService.getStudentProfile(userPrincipal.getId());
	}

	@GetMapping("/info")
	public Optional<StudentMainInfoDto> getStudentData(@CurrentUser UserPrincipal userPrincipal) {
		return studentService.getStudentByUserId(userPrincipal.getId());
	}

	@PostMapping("goal")
	public void setGoal(@CurrentUser UserPrincipal userPrincipal, @RequestBody SetGoalRequest request) {
		studentService.setProgressGoal(userPrincipal.getId(), request.getGoalId());
	}

	@GetMapping("goal")
	public Optional<ProgressResponseDto> getCurrentProgress(@CurrentUser UserPrincipal userPrincipal) {
		return studentService.getCurrentProgress(userPrincipal.getId());
	}
}
