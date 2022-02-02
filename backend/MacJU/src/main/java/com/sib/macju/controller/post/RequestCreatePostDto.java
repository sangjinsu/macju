package com.sib.macju.controller.post;

import lombok.Data;

import java.util.List;

@Data
public class RequestCreatePostDto {
    private Long beerId;
    private Long memberId;
    private String content;
    private List<String> paths;
    private List<String> userHashTags;
}
