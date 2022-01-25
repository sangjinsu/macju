package com.sib.macju.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
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

    @ManyToOne
    @JoinColumn
    private Member following = this;

    @ManyToOne
    @JoinColumn
    private Member follower = this;

    @OneToMany(mappedBy = "following")
    private List<Member> followings = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    private List<Member> followers = new ArrayList<>();

    public void addFollowing(Member following) {
        this.followings.add(following);

        if (!following.getFollowers().contains(this)) {
            following.getFollowers().add(this);
        }

        if (!following.getFollower().getFollowers().contains(this)) {
            following.getFollower().getFollowers().add(this);
        }
    }

    public void addFollower(Member follower) {
        this.followers.add(follower);

        if (!follower.getFollowings().contains(this)) {
            follower.getFollowings().add(this);
        }

        if (!follower.getFollowing().getFollowings().contains(this)) {
            follower.getFollowing().getFollowings().add(this);
        }
    }
}