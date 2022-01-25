package com.sib.macju.repository.hashtag;

import com.sib.macju.domain.hashtag.AromaHashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AromaHashTagRepository extends JpaRepository<AromaHashTag, Long> {
    @Query("select tag from AromaHashTag tag where tag.aroma = :aroma")
    List<AromaHashTag> findByName(String aroma);
}