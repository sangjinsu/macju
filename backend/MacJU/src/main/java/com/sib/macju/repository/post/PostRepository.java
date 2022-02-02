package com.sib.macju.repository.post;

import com.sib.macju.domain.post.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


// Post 생성, (단일, 다수) 조회, content 수정, updated_at 시간 수정, 삭제

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(
            "select post from Post post join fetch post.beer where post.beer.beerId = :beerId"
    )
    List<Post> findByBeerId(@Param("beerId") Long beerId);

    @Query("select post from Post post join fetch post.beer join fetch post.member where post.beer.beerId = :beerId order by post.updatedAt desc ")
    List<Post> findAllByBeer_BeerId();

    @Query("select post from Post post join fetch post.member join fetch post.beer order by post.updatedAt desc ")
    List<Post> findAllWithDetails(Pageable pageable);

    @Query("select post from Post post where post.member.memberId = :memberId order by post.updatedAt desc")
    List<Post> findByMemberId(@Param("memberId") Long memberId);
}
