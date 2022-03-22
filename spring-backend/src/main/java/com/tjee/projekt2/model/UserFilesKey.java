package com.tjee.projekt2.model;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@Accessors(chain = true)
@AllArgsConstructor
public class UserFilesKey implements Serializable {
    @Column
    private long id_app;
    @Column
    private long id_user;

}
