package com.sib.macju.domain;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "post_has_user_hash_tag")
public class PostHasUserHashTag {

    @Id
    @Column(name = "post_has_user_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postHasUserHashTagId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_hash_tag_id")
    private UserHashTag userHashTag;

}
