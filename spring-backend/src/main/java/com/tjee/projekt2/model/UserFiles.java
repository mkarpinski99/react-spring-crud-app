package com.tjee.projekt2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Accessors(chain = true)
@Getter
@Setter
@AllArgsConstructor
@Entity
public class UserFiles {

    @EmbeddedId
    UserFilesKey id;

    @JsonIgnore
    @ManyToOne
    @MapsId("id_user")
    @JoinColumn(name = "id_user")
    private User user;

    @JsonIgnore
    @ManyToOne
    @MapsId("id_app")
    @JoinColumn(name = "id_app")
    private App app;

    @NotNull
    private String filename;
}
