package com.sib.macju.repository.hashtag;

import com.sib.macju.domain.hashtag.FlavorHashTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlavorHashTagRepository extends JpaRepository<FlavorHashTag, Long> {
    @Query("select tag from FlavorHashTag tag where tag.flavor = :flavor")
    List<FlavorHashTag> findByFlavor(String flavor);
}