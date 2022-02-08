package com.sib.macju.dto.member;

import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberVO {

    private Long memberId;

    private String nickName;

    private String name;

    private String comment;

    private int age;

    private int grade;

    @Builder
    public MemberVO(Long memberId, String nickName, String name, int age, int grade) {
        this.memberId = memberId;
        this.nickName = nickName;
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

}