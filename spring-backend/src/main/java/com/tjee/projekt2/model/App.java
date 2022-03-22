package com.tjee.projekt2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.HashSet;
import java.util.Set;


@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
public class App {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull(message = "Nazwa nie może być pusta")
    private String name;

    @Pattern(regexp="^.*\\..*\\..*$", message = "Zły format domeny")
    private String domain;

    @NotNull
    private String version;

    @JsonIgnore
    @OneToMany(mappedBy = "app", cascade = CascadeType.REMOVE)
    private Set<AppImageData> appImageDataSet = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "app", cascade = CascadeType.REMOVE)
    private Set<AppLocation> appLocationSet = new HashSet<>();

    @JsonIgnore
    @ManyToMany()
    @JoinTable(
            name = "appUsers",
            joinColumns = @JoinColumn(name = "app_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> appUsers = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "app", cascade = CascadeType.REMOVE)
    private Set<UserFiles> files = new HashSet<>();
}
