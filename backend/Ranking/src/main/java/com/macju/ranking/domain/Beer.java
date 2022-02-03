package com.macju.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash(value="Beer", timeToLive = 86400) // 1일간 유지
public class Beer implements Serializable {

    @Id
    private String id;
    private Long viewCount;
    private Long likeCount;

}
