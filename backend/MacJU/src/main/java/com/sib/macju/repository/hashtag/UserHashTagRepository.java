package com.sib.macju.repository.hashtag;

import com.sib.macju.domain.hashtag.UserHashTag;
import com.sib.macju.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserHashTagRepository extends JpaRepository<UserHashTag, Long> {
    @Query("select tag from UserHashTag tag where tag.content = :content")
    Optional<UserHashTag> findByContent(@Param("content") String content);

    @Query("select tag from UserHashTag tag where tag.is_deleted = true ")
    List<UserHashTag> findByIs_deleted();

}