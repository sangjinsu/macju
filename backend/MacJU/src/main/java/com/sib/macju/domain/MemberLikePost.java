package com.sib.macju.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "member_like_post")
@Getter
public class MemberLikePost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_like_post_id")
    private Long memberLikePostId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}