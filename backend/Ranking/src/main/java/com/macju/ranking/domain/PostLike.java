package com.macju.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Data
@RedisHash(value="postlike")//, timeToLive = 86400) // 1일간 유지
public class PostLike {

    @Id
    private Long Id;
    @Indexed
    private Long postId;
    @Indexed
    private Long memberId;

}


