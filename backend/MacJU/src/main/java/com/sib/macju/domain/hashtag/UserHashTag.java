package com.sib.macju.domain.hashtag;

import com.sib.macju.domain.post.Post;
import lombok.Getter;

import javax.persistence.*;


@Entity
@Getter
@Table(name = "user_hashtag")
public class UserHashTag {

    @Id
    @Column(name = "user_hashtag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userHashTagId;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public void setContent(String content) {
        this.content = content;
    }

    public void setPost(Post post) {
        this.post = post;
        post.getUserHashTags().add(this);
    }

    public static UserHashTag createUserHashTag(String content, Post post) {
        UserHashTag userHashTag = new UserHashTag();
        userHashTag.setContent(content);
        userHashTag.setPost(post);
        return userHashTag;
    }
}

