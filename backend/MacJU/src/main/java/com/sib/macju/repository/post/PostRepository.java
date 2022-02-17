package com.sib.macju.repository.post;

import com.sib.macju.domain.hashtag.UserHashTag;
import com.sib.macju.domain.post.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


// Post 생성, (단일, 다수) 조회, content 수정, updated_at 시간 수정, 삭제

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(
            "select post from Post post join fetch post.beer where post.beer.beerId = :beerId and post.is_deleted = false"
    )
    List<Post> findByBeerId(@Param("beerId") Long beerId);

    @Query("select post from Post post join fetch post.beer join fetch post.member where post.beer.beerId = :beerId and post.is_deleted = false order by post.updatedAt desc ")
    List<Post> findAllByBeer_BeerId(@Param("beerId") Long beerId);

    @Query("select post from Post post join fetch post.member join fetch post.beer where post.is_deleted = false order by post.updatedAt desc ")
    List<Post> findAllWithDetails(Pageable pageable);

    @Query("select post from Post post where post.member.memberId = :memberId and post.is_deleted = false order by post.updatedAt desc")
    List<Post> findByMemberId(@Param("memberId") Long memberId);

    @Query("select post from Post post where post.postId = :postId and post.is_deleted = false")
    Optional<Post> findByPostIdAndIs_deletedIsFalse(@Param("postId") Long postId);

    @Modifying
    @Query("delete from Post where is_deleted = true")
    int deleteAllByIs_deletedIsTrue();

}
