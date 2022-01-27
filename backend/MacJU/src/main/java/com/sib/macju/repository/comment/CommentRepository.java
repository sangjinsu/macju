package com.sib.macju.repository.comment;

import com.sib.macju.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 댓글 생성, 다수 조회, 삭제 // 단일 조회, 수정은 X

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
