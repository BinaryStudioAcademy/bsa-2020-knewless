package com.knewless.core.auth;

import com.knewless.core.auth.Dto.SavePasswordDtoRequest;
import com.knewless.core.auth.Dto.SavePasswordDtoResponse;
import com.knewless.core.exception.UserAlreadyRegisteredException;
import com.knewless.core.security.model.LoginRequest;
import com.knewless.core.security.model.SignUpRequest;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                            ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        try {
            return ResponseEntity.ok(authService.register(signUpRequest));
        } catch (UserAlreadyRegisteredException ex) {
            return ResponseEntity.badRequest().body(new SingleMessageResponse(ex.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Refresh-token") String token) {
        try {
            return ResponseEntity.ok(authService.refreshToken(token));
        } catch (Exception ex) {
            return new ResponseEntity<>(new SingleMessageResponse(ex.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/reset")
    public ResponseEntity<?> getResetLink(@Valid @RequestParam String email) {
        return ResponseEntity.ok(authService.getResetLink(email));
    }

    @GetMapping("/checkreset")
    public ResponseEntity<?> checkResetLink(@Valid @RequestParam UUID id) {
        return ResponseEntity.ok(authService.validateLink(id));
    }
    
    @PostMapping("/savepassword")
    public SavePasswordDtoResponse savePassword(@Valid @RequestBody SavePasswordDtoRequest request) {
        return authService.savePassword(request.getResetId(), request.getPassword());
    }


}
