package com.sib.macju.dto.member;

import com.sib.macju.domain.member.ProfileColor;
import com.sib.macju.domain.member.Status;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

    private Long memberId;

    private Long kakaoId;

    private String nickName;

    private String name;

    private String intro;

    private int age;

    private int grade;

    private ProfileColor profileColor;

    private Status status;

}