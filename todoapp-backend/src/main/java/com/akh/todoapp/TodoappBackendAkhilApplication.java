package com.akh.todoapp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class TodoappBackendDileepApplication {
	public static void main(String[] args) {
		SpringApplication.run(TodoappBackendDileepApplication.class, args);
	}
}