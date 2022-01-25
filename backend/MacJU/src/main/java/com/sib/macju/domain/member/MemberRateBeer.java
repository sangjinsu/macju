package com.sib.macju.domain.member;

import com.sib.macju.domain.beer.Beer;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Entity
@Getter
@Table(name = "member_rate_beer")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRateBeer {

    @Id
    @Column(name = "member_rate_beer_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberRateBeerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer_id")
    private Beer beer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int rate;

}
