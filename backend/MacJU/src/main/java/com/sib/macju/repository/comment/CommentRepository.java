package com.sib.macju.repository.comment;

import com.sib.macju.domain.comment.Comment;
import com.sib.macju.domain.post.Post;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// 댓글 생성, 다수 조회, 삭제 // 단일 조회, 수정은 X

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

//    public List<Comment> findByPostId(Long postId);

    @Query("SELECT c from Comment c join fetch c.post where c.post.postId=:postId and c.commentId>0 order by c.commentId ASC ")
    public List<Comment> findByPostId(@Param("postId") Long postId);

}
