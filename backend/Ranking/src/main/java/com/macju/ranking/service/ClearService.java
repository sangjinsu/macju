package com.macju.ranking.service;


import com.macju.ranking.component.RankingZset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ClearService {

    @Autowired
    private final RedisTemplate<String,String> redisTemplate = new RedisTemplate<>();
    @Autowired
    RankingZset rankingZset = new RankingZset(redisTemplate);

    @Transactional
    public void flushALl() {
        RedisConnectionFactory r = redisTemplate.getConnectionFactory();
        RedisConnection rc = r.getConnection();
        rc.flushAll();
    }

}
