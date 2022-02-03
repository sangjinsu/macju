package com.sib.macju.dto.comment;

import com.sib.macju.domain.comment.Comment;
import com.sib.macju.dto.post.PostDetailDto;
import com.sib.macju.dto.post.PostDto;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class CommentDto implements Serializable {
    private final Long commentId;
    private final String content;
    private final LocalDateTime createdAt;
    private final Long memberId;
    private final Long postId;

    public CommentDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.memberId = comment.getMember().getMemberId();
        this.postId = comment.getPost().getPostId();
    }
}
