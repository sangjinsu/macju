package com.sib.macju.repository.hashtag;

import com.sib.macju.domain.hashtag.UserHashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHashTagRepository extends JpaRepository<UserHashTag, Long> {
    @Query("select tag from UserHashTag tag where tag.content = :content")
    List<UserHashTag> findByContent(String content);
}