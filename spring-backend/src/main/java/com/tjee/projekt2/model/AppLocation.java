package com.tjee.projekt2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
public class AppLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Pattern(regexp = "^\\b\\p{Lu}.*\\b")
    private String city;

    @Pattern(regexp = "^\\b\\p{Lu}.*\\b")
    private String street;

    private int street_number;

    @Pattern(regexp = "^\\b\\p{Lu}.*\\b")
    private String country;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "app_id", nullable = false)
    private App app;
}
