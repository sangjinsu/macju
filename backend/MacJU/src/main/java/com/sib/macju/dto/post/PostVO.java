package com.sib.macju.dto.post;

import com.sib.macju.dto.beer.BeerVO;
import com.sib.macju.dto.member.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostVO {

    private Long postId;

    private BeerVO beer;

    private MemberDto member;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}
