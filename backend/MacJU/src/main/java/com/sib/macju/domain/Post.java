package com.sib.macju.domain;

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
    private Long beerId;
    private Long memberId;
    private String content;
    private Date createAt;
    private Date updateAt;
    private Long viewCount;
    private int likeNum;


}
