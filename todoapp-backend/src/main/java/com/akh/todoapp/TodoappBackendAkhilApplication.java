package com.akh.todoapp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class TodoappBackendAkhilApplication {
	public static void main(String[] args) {
		SpringApplication.run(TodoappBackendAkhilApplication.class, args);
	}
}