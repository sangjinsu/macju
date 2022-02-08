package com.macju.ranking.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class PostVo implements Serializable {
    private final Long postId;

    public PostVo(PostView post) {
        this.postId = post.getPostId();
    }

    public PostVo(PostLike post) {
        this.postId = post.getPostId();
    }

    public PostVo(String postId) {
        this.postId = Long.valueOf(postId);
    }
}
