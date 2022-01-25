package com.sib.macju.domain.member;

import com.sib.macju.domain.beer.Beer;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "member_like_beer")
public class MemberLikeBeer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_like_beer_id")
    private Long memberLikeBeerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer_id")
    private Beer beer;
}