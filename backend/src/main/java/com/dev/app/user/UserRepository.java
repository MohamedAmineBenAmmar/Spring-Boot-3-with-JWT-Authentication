package com.dev.app.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Integer refers as the id of the class User
public interface UserRepository extends JpaRepository<User, Integer> {

    // Find user by email
    Optional<User> findByEmail(String email);
}
