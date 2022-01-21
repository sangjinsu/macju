package com.sib.macju.domain;

import lombok.Data;
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

    @Column(name = "nick_name")
    private String nickName;

    private String name;

    private String role;

    private int age;

    @Column(name = "profile_color")
    private String profileColor;

    private int grade;

}