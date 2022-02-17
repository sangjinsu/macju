package com.sib.macju.domain.hashtag;

import com.sib.macju.domain.post.Post;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;


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

    private LocalDateTime updated_at;

    private boolean is_deleted;

    public void setContent(String content) {
        this.content = content;}

    public void setUpdated_at(){
        this.updated_at = LocalDateTime.now();
    }

    public void setIs_deleted(){
        this.is_deleted = false;
    }

    public void deleteUserhashtag(){
        this.is_deleted = true;
    }


    public void setPost(Post post) {
        this.post = post;
        post.getUserHashTags().add(this);
    }

    public static UserHashTag createUserHashTag(String content, Post post) {
        UserHashTag userHashTag = new UserHashTag();
        userHashTag.setContent(content);
        userHashTag.setPost(post);
        userHashTag.setUpdated_at();
        userHashTag.setIs_deleted();
        return userHashTag;
    }
}

