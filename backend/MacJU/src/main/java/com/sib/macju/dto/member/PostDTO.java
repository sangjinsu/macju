package com.sib.macju.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {

    private Long postId;

    private BeerDTO beer;

    private MemberDTO member;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}
