package com.sib.macju.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberId;

    private String nickName;
    private String name;
    private String role;
    private int age;
    private String profileColor;
    private int grade;
    private String kakaoToken;
}
