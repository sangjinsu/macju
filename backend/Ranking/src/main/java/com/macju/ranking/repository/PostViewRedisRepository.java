package com.macju.ranking.repository;

import com.macju.ranking.domain.PostLike;
import com.macju.ranking.domain.PostView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostViewRedisRepository extends CrudRepository<PostView, Long> {
    public PostView findByPostIdAndMemberId(Long postId, Long memberId);
    public void deleteByPostIdAndMemberId(Long postId, Long memberId);

}
