package com.macju.ranking.repository;

import com.macju.ranking.domain.PostLike;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostLikeRedisRepository extends CrudRepository<PostLike, Long> {
    public PostLike findByPostIdAndMemberId(Long postId, Long memberId);
    public void deleteByPostIdAndMemberId(Long postId, Long memberId);
//    public PostLike findbyPostId(Long postId);
    public List<PostLike> findAllByPostId(Long postId);
//    public void deleteAllById(List<PostLike> PostLike);
}
