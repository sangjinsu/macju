package com.sib.macju.repository.post;

import com.sib.macju.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// Post 생성, (단일, 다수) 조회, content 수정, updated_at 시간 수정, 삭제

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
