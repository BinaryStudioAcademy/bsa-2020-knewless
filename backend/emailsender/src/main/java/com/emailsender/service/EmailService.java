package com.emailsender.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private EmailSender emailSender;

    public void sendResetMessage(
            String to, String link) {
        String resetLink = "<a href=\"" + link + "\">link.</a>";
        String body = String.join(
                System.getProperty("line.separator"),
                "<h3>Hello, friend!</h3>",
                "<p>You've been requested reset your password on <i><b>Knewless site</b></i>.</p>",
                "<p><b>Link time expires in 10 minutes. </b> Your " + resetLink + "</p>",
                "<br />");
        emailSender.send(to, body, "Reset password");
    }

    public void sendRegisterMessage(
            String to, String link) {
        String registerlink = "<a href=\"" + link + "\">link</a>";
        String body = String.join(
                System.getProperty("line.separator"),
                "<h1>You're almost ready to get started!</h1>",
                "<p><i>Click this " + registerlink + " to complete your Knewless account setup</i></p>",
                "<p><i>Verifying your email ensures that you can receive important notifications.</i> </p>",
                "<p><i>Thanks,</i></p>",
                "<p><i>Knewless</i></p>",
                "<br />");
        emailSender.send(to, body, "Registration");
    }

}
