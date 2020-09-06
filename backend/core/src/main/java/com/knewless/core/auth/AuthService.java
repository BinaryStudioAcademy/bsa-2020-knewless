package com.knewless.core.auth;

import com.knewless.core.auth.Dto.SavePasswordDtoResponse;
import com.knewless.core.auth.Dto.ValidateResetLinkResponseDto;
import com.knewless.core.auth.Dto.VerifyEmailResponseDto;
import com.knewless.core.emailservice.Dto.TemporaryDto;
import com.knewless.core.emailservice.EmailService;
import com.knewless.core.exception.custom.UserAlreadyRegisteredException;
import com.knewless.core.security.model.AuthResponse;
import com.knewless.core.security.model.LoginRequest;
import com.knewless.core.security.model.RefreshTokenResponse;
import com.knewless.core.security.model.SignUpRequest;
import com.knewless.core.security.oauth.TokenProvider;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.UserService;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;

    private final TokenProvider tokenProvider;

    private final UserRepository userRepository;

    private final UserService customUserDetailsService;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, TokenProvider tokenProvider,
                       UserRepository userRepository, UserService customUserDetailsService,
                       PasswordEncoder passwordEncoder, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public AuthResponse login(LoginRequest loginRequest) {
        final var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final var token = tokenProvider.createAccessToken(authentication);
        final var refresh = tokenProvider.createRefreshToken(authentication);
        return new AuthResponse(token, refresh);
    }

    public AuthResponse register(SignUpRequest signUpRequest) throws UserAlreadyRegisteredException {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new UserAlreadyRegisteredException(
                    "User with email '" + signUpRequest.getEmail() + "' is already registered."
            );
        }
        final var user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);
        emailService.generateRegisterAndSendEmail(user.getId());
        return login(new LoginRequest(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    public RefreshTokenResponse refreshToken(String token) {
        tokenProvider.validateToken(token);
        final var userId = tokenProvider.getUserIdFromToken(token);
        final var userDetails = customUserDetailsService.loadUserById(userId);
        final var authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new RefreshTokenResponse(tokenProvider.createAccessToken(authentication));
    }

    public boolean getResetLink(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return false;
        } else {
            emailService.generateResetAndSendEmail(user.get().getId());
            return true;
        }
    }

    public ValidateResetLinkResponseDto validateLink(UUID id) {
        return emailService.isResetValid(id);
    }

    public SavePasswordDtoResponse savePassword(UUID resetId, String password) {
        var result = emailService.isResetValid(resetId);
        if (!result.isValidLink()) {
            return  SavePasswordDtoResponse.builder().comment("Reset link have been expired").isSuccessfull(false).build();
        } else {
            UUID userId = emailService.resets.stream().filter(r->r.getId().equals(resetId)).findFirst().orElseThrow().getUserId();
            String codedpassword = passwordEncoder.encode(password);
            userRepository.setPassword(userId, codedpassword);
            emailService.removeReset(resetId);
            return SavePasswordDtoResponse.builder().isSuccessfull(true).comment("Password saved").build();
        }
    }

    public VerifyEmailResponseDto verifyEmail(UUID id) {
        TemporaryDto registerDto = emailService.getRegisterDto(id);
        if (registerDto == null) return VerifyEmailResponseDto.builder().isVerified(false).build();

        Optional<User> userOptional = userRepository.findById(registerDto.getUserId());
        if (userOptional.isEmpty()) return VerifyEmailResponseDto.builder().isVerified(false).build();

        User user = userOptional.get();
        user.setEmailVerified(true);
        userRepository.save(user);
        final UserDetails userDetails = customUserDetailsService.loadUserById(registerDto.getUserId());
        final Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = tokenProvider.createAccessToken(authentication);
        final String refresh = tokenProvider.createRefreshToken(authentication);
        emailService.removeRegister(id);
        return VerifyEmailResponseDto.builder().isVerified(true).token(token).refresh(refresh).build();
    }

}
