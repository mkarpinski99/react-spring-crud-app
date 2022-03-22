package com.tjee.projekt2.dto;

import com.tjee.projekt2.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Set<Role> roles;
    private long id;
}
