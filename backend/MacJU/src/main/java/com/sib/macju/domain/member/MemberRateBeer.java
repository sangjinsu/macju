package com.sib.macju.domain.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.hashtag.AromaHashTag;
import com.sib.macju.domain.hashtag.FlavorHashTag;
import lombok.*;


import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Table(name = "member_rate_beer")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRateBeer {

    @Id
    @Column(name = "member_rate_beer_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberRateBeerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer_id")
    private Beer beer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "memberRateBeer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RateHasAromaHashTag> rateHasAromaHashTags;

    @OneToMany(mappedBy = "memberRateBeer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RateHasFlavorHashTag> rateHasFlavorHashTags;

    private int rate;

    public void setBeer(Beer beer) {
        if (this.beer != null) {
            this.beer.getMemberRateBeers().remove(this);
        }
        this.beer = beer;
        beer.getMemberRateBeers().add(this);
    }

    public void setMember(Member member) {
        this.member = member;
        // 멤버 필요
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public static MemberRateBeer createMemberRateBeer(
            Beer beer, Member member,
            int rate
    ) {

        MemberRateBeer memberRateBeer = new MemberRateBeer();

        memberRateBeer.setBeer(beer);
        memberRateBeer.setMember(member);
        memberRateBeer.setRate(rate);

        return memberRateBeer;
    }
}
