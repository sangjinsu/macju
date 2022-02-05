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
    private final Long memberId;
    private final String nickname;

    public CommentDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.memberId = comment.getMember().getMemberId();
        this.nickname = comment.getMember().getNickName();
    }
}
