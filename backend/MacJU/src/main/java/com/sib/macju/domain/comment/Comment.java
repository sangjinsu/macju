package com.sib.macju.domain.comment;


import com.sib.macju.domain.post.Post;
import com.sib.macju.domain.member.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@Entity
//@Getter
@Table(name = "comment")
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String content;

    @Builder
    public Comment() {
        this.createdAt = LocalDateTime.now();
    }
}