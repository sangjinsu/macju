package com.macju.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash(value="Post", timeToLive = 86400) // 1일간 유지
public class Post implements Serializable {

    @Id
    private Long postId;
    private Long viewCount;
    private Long likeCount;

}


