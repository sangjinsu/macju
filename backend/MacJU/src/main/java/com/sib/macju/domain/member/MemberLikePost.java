package com.sib.macju.domain.member;

import com.sib.macju.domain.post.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "member_like_post")
@Getter
@Setter
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