package com.sib.macju.domain.member;

import com.sib.macju.domain.post.Post;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@ToString
@Table(name = "member")
@NoArgsConstructor//(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberId;

    @Column(name = "kakao_id", unique = true, nullable = false)
    private Long kakaoId;

    @Column(
            name = "nick_name",
            length = 10,
            nullable = false,
            unique = true)
    private String nickName;

    @Column(nullable = false)
    private String name;

    @Column(length = 150)
    private String intro;

    @Setter
    @Enumerated(EnumType.STRING)
    private Status status = Status.Activate;

    @Column(nullable = false)
    private int age;

    @ColumnDefault("1")
    private int grade;

    @OneToMany(mappedBy = "following")
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberFondAromaHashTag> memberFondAromaHashTags;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberFondFlavorHashTag> memberFondFlavorHashTags;

}