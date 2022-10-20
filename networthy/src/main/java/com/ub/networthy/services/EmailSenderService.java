package com.ub.networthy.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ub.networthy.controllers.AuthController;

@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender mailSender;
	
	Logger logger = LoggerFactory.getLogger(EmailSenderService.class);
	
	public void sendEmail(String toEmail, String subject, String body) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("amolnetworthy@gmail.com");
		message.setTo(toEmail);
		message.setSubject(subject);
		message.setText(body);
		
		mailSender.send(message);
		logger.info("Email Sent to "+ toEmail + " for verification");
		
		System.out.println("Mail Sent");
	}
}
