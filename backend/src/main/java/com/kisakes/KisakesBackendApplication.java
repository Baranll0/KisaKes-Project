package com.kisakes;

import com.kisakes.model.User;
import com.kisakes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class KisakesBackendApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(KisakesBackendApplication.class, args);
    }

    @Override
    public void run(String... args) {
        // Admin kullanıcısı yoksa oluştur
        if (!userRepository.findByEmail("admin@gmail.com").isPresent()) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("password"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }
} 