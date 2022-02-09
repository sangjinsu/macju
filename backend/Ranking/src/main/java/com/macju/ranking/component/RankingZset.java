package com.macju.ranking.component;

import io.lettuce.core.api.sync.RedisServerCommands;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class RankingZset {

    //Sorted Set 추가
    @Autowired
    private final RedisTemplate<String,String> redisTemplate;
    private final ZSetOperations<String, String> zSetOperations;
    private final SetOperations<String, String> SetOperations;

    public RankingZset(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.zSetOperations = redisTemplate.opsForZSet();
        this.SetOperations = redisTemplate.opsForSet();
    }

    public void postViewCount(Long postId) {
        zSetOperations.incrementScore("postviewcount", String.valueOf(postId), 1);
    }

    public void postLikeCountUp(Long postId) {
        zSetOperations.incrementScore("postlikecount", String.valueOf(postId), 1);
    }

    public void postLikeCountDown(Long postId){
        zSetOperations.incrementScore("postlikecount", String.valueOf(postId), -1);
    }

    public void beerViewCount(Long beerId) {
        zSetOperations.incrementScore("beerviewcount", String.valueOf(beerId), 1);
    }

    public void beerLikeCountUp(Long beerId) {
        zSetOperations.incrementScore("beerlikecount", String.valueOf(beerId), 1);
    }

    public void beerLikeCountDown(Long beerId) {
        zSetOperations.incrementScore("beerlikecount", String.valueOf(beerId), -1);
    }

    public List<String> getBeerViewId() {
        return new ArrayList<>(zSetOperations.reverseRange("beerviewcount", 0,1));
    }

    public List<String> getBeerLikeId() {
        return new ArrayList<>(zSetOperations.reverseRange("beerlikecount", 0,1));
    }

    public List<String> getPostViewId() {
        return new ArrayList<>(zSetOperations.reverseRange("postviewcount", 0,1));
    }

    public List<String> getPostLikeId() {
        return new ArrayList<>(zSetOperations.reverseRange("postlikecount", 0,1));
    }


    // 포스트 삭제시 ZSet에서 해당 postId 삭제
    public void deletePostById(Long postId) {
        zSetOperations.remove("postlikecount", String.valueOf(postId));
        zSetOperations.remove("postviewcount", String.valueOf(postId));
    }

    public void deleteBeer() {
        redisTemplate.delete("beerlikecount");
        redisTemplate.delete("beerviewcount");
    }

    public void deletePost() {
        redisTemplate.delete("postlikecount");
        redisTemplate.delete("postviewcount");
    }

//    // 시간 추가
//    public void deleteAll() {
//        redisTemplate.delete("beerlikecount");
//        redisTemplate.delete("beerviewcount");
//        redisTemplate.delete("postlikecount");
//        redisTemplate.delete("postviewcount");
//    }


}
