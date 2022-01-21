package com.sib.macju.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "photo")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo {

    @Id
    @Column(name = "photo_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long photoId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(unique = true)
    private String data;
}
