package com.knewless.core.emailservice;

import com.knewless.core.auth.Dto.ValidateResetLinkResponseDto;
import com.knewless.core.emailservice.Dto.DtoType;
import com.knewless.core.emailservice.Dto.TemporaryDto;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.knewless.core.messaging.emailMessage.EmailMessage;
import com.knewless.core.messaging.emailMessage.EmailMessageType;
import com.knewless.core.messaging.MessageSender;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class EmailService {
    @Value("${domain.name}")
    private String domain;

    private final MessageSender messageSender;
    private final UserRepository userRepository;
    public List<TemporaryDto> resets;
    public List<TemporaryDto> registers;

    @Autowired
    public EmailService(MessageSender messageSender, UserRepository userRepository) {
        this.messageSender = messageSender;
        this.userRepository = userRepository;
        this.resets = new ArrayList<>();
        this.registers = new ArrayList<>();
    }

    public void generateResetAndSendEmail(UUID userId) {
        String email = userRepository.findById(userId).orElseThrow().getEmail();
        TemporaryDto dto = TemporaryDto.builder()
                .createdAt(new Date())
                .id(UUID.randomUUID())
                .type(DtoType.RESET)
                .userId(userId)
                .build();
        resets.add(dto);
        String link = domain + "savepassword/" + dto.getId();
        EmailMessage message = EmailMessage.builder().email(email).type(EmailMessageType.RESET).link(link).build();
        messageSender.sendEmail(message);
    }

    public void generateRegisterAndSendEmail(UUID userId) {
        String email = userRepository.findById(userId).orElseThrow().getEmail();
        TemporaryDto dto = TemporaryDto.builder()
                .createdAt(new Date())
                .id(UUID.randomUUID())
                .type(DtoType.REGISTRATION)
                .userId(userId)
                .build();
        registers.add(dto);
        String link = domain + "register/" + dto.getId();
        EmailMessage message = EmailMessage.builder().email(email).type(EmailMessageType.REGISTRATION).link(link).build();
        messageSender.sendEmail(message);
    }

    public ValidateResetLinkResponseDto isResetValid(UUID id) {
        Optional<TemporaryDto> res = resets.stream().filter(r-> r.getId().equals(id)).findFirst();
        if (res.isEmpty()) {
            return ValidateResetLinkResponseDto.builder().email(null).isValidLink(false).build();
        } else {
            long diffInMillies  = (new Date().getTime() - res.get().getCreatedAt().getTime());
            long diff = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
            String email = userRepository.findById(res.get().getUserId())
                    .orElseThrow().getEmail();
            if (diff > 10) {
                return ValidateResetLinkResponseDto.builder().email(email).isValidLink(false).build();
            } else {
                return ValidateResetLinkResponseDto.builder().email(email).isValidLink(true).build();
            }
        }
    }

    public void removeReset(UUID id) {
        Optional<TemporaryDto> res = resets.stream().filter(r-> r.getId().equals(id)).findFirst();
        if (res.isPresent()) resets.remove(res.get());
    }
}
