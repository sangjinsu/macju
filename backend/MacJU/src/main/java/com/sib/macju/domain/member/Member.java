package com.sib.macju.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberId;

    @Column(
            name = "nick_name",
            length = 10,
            nullable = false,
            unique = true)
    private String nickName;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Activate;

    @Column(nullable = false)
    private int age;

    @Enumerated(EnumType.STRING)
    @Column(name = "profile_color")
    private ProfileColor profileColor = ProfileColor.White;

    @ColumnDefault("0")
    private int grade;

    @OneToMany(mappedBy = "following")
    private List<Follow> followings;

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers;
}