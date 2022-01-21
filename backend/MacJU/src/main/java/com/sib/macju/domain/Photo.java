package com.sib.macju.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "photo")
public class Photo {

    @Id
    @Column(name = "photo_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String photoId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post postId;
}
