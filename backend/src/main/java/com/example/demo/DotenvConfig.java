package com.example.demo;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    void loadEnv() {
        Dotenv dotenv = Dotenv.load();
        dotenv.entries()
                .forEach(e ->  {
                    System.out.println(e.getKey() + " = " + e.getValue());
                    System.setProperty(e.getKey(), e.getValue());
                });
    }
}
