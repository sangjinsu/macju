package com.sib.macju.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRateBeer {

    @Id
    @Column(name = "member_rate_beer_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberRateBeerId;

    @ManyToOne
    @JoinColumn(name = "beer_id")
    private Beer beer;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private int rate;

}
