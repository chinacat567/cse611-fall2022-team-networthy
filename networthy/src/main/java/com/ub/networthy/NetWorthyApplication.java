package com.ub.networthy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ub.networthy.services.EmailSenderService;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
//@EnableSwagger2
public class NetWorthyApplication {
	
	@Autowired
	EmailSenderService emailSenderService;

	public static void main(String[] args) {
		SpringApplication.run(NetWorthyApplication.class, args);
	}
	
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
			}
		};
	}
	
	/*
	 * @EventListener(ApplicationReadyEvent.class) public void sendMail() {
	 * //emailSenderService.sendEmail("gharpure.amol1@gmail.com", "Subject",
	 * "Body"); emailSenderService.sendEmail("gharpure.amol1@gmail.com",
	 * "Welcome To NetWorthy",
	 * "Please click on the link to verify your email - http://localhost:8080/api/auth/verify/user  \n\n Thank You,\n NetWorthy"
	 * ); }
	 */

}
