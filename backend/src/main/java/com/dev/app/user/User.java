package com.dev.app.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder // Building the object using the design pattern builder
@NoArgsConstructor
@AllArgsConstructor // When we are working with the design pattern builder we use this parameter
@Entity
@Table(name = "users") // In case we want to change the name of the table
public class User implements UserDetails {
    @Id // Telling that the id field is the primary key
    @GeneratedValue // Telling that the id field is auto-increment
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING) // Telling that the role field is an enum
    private Role role; // We created the class in a way that the user have only one role

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // We will return a list of authorities
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // true means that the account is not expired
        // else we are not able to connect our users
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
