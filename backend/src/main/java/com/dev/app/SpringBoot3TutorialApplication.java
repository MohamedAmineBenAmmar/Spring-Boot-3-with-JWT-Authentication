package com.dev.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan({"com.dev.app.user", "com.dev.app.flight", "com.dev.app.catering_companies"})
// @ComponentScan("com.dev.app.exception")
public class SpringBoot3TutorialApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBoot3TutorialApplication.class, args);
	}

}
