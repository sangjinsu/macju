package com.sib.macju.domain;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Table(name = "post")
public class Post {

    @Id
    @Column(name = "post_id")
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "beer_id")
    private Beer beerId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    private String content;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "view_count")
    private Long viewCount;

    @Column(name = "like_Num")
    private int likeNum;


}