package com.sib.macju.dto.comment;

import lombok.Data;

@Data
public class RequestCreateCommentDto {
    private Long memberId;
    private String content;
}
