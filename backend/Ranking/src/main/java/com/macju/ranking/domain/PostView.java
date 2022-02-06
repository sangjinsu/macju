package com.macju.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.List;

@Data
@RedisHash(value="postview")//, timeToLive = 10) // 1일간 유지
public class PostView implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    @Indexed
    private Long postId;
    @Indexed
    private Long memberId;

}


