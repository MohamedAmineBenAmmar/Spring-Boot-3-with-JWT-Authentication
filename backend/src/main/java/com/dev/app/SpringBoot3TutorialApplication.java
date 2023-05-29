package com.dev.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan({"com.dev.app.user", "com.dev.app.flight"})
public class SpringBoot3TutorialApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBoot3TutorialApplication.class, args);
	}

}
