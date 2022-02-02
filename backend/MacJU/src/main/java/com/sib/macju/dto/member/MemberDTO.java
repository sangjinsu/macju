package com.sib.macju.dto.member;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberDTO {

    private Long memberId;

    private String nickName;

    private String name;

    private int age;

    private int grade;

    @Builder
    public MemberDTO(Long memberId, String nickName, String name, int age, int grade) {
        this.memberId = memberId;
        this.nickName = nickName;
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

}