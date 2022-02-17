package com.sib.macju.repository.hashtag;

import com.sib.macju.domain.hashtag.UserHashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHashTagRepository extends JpaRepository<UserHashTag, Long> {
    @Query("select tag from UserHashTag tag where tag.content = :content")
    List<UserHashTag> findByContent(@Param("content") String content);

    @Query("select t from UserHashTag t where t.is_deleted = true")
    List<UserHashTag> findByIs_deleted();

    @Modifying
    @Query("delete from UserHashTag where is_deleted = true")
    int deleteAllByIs_deletedIsTrue();

}