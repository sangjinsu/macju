package com.sib.macju.controller.post;

import lombok.Data;

import java.util.List;

@Data
public class RequestUpdatePostDto {
    private Long postId;
    private String content;
    private List<String> userHashTags;
}
