package com.sib.macju.domain;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "comment")
public class Comment{

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String commentId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post postId;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    private String content;

}