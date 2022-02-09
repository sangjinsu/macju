package com.macju.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;

@Data
@RedisHash(value="beerlike")//, timeToLive = 86400) // 1일간 유지
public class BeerLike implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    @Indexed
    private Long beerId;
    @Indexed
    private Long memberId;

}
