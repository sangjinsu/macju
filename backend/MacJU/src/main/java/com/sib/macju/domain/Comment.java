package com.sib.macju.domain;

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

    @Column(name = "member_id")
    private Long memberId;
    private Long postId;
    private Date createAt;
    private Date updateAt;
    private String content;

}
