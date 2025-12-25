package com.example.demo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		try {
			Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
			dotenv.entries().forEach(entry -> {
				System.setProperty(entry.getKey(), entry.getValue());
			});
			System.out.println("Loaded .env successfully.");
		} catch (Exception e) {
			System.out.println(".env not found, skipping...");
		}

		SpringApplication.run(DemoApplication.class, args);
	}

}
