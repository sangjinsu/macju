package com.sib.macju.repository.post;

import com.sib.macju.domain.post.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
