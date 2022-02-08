package com.sib.macju.domain.member;


import com.sib.macju.domain.hashtag.FlavorHashTag;
import com.sib.macju.domain.member.MemberRateBeer;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "rate_has_flavor_hash_tag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RateHasFlavorHashTag {

    @Id
    @Column(name = "rate_has_flavor_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rateHasFlavorHashTagId;

    @ManyToOne
    @JoinColumn(name = "member_rate_beer_id")
    private MemberRateBeer memberRateBeer;

    @ManyToOne
    @JoinColumn(name = "flavor_hash_tag_id")
    private FlavorHashTag flavorHashTag;

    public void setMemberRateBeer(MemberRateBeer memberRateBeer) {
        this.memberRateBeer = memberRateBeer;
    }

    public void setFlavorHashTag(FlavorHashTag flavorHashTag) {
        this.flavorHashTag = flavorHashTag;
    }

    public static RateHasFlavorHashTag createRateHasFlavorHashTag(FlavorHashTag flavorHashTag, MemberRateBeer memberRateBeer) {
        RateHasFlavorHashTag rateHasFlavorHashTag = new RateHasFlavorHashTag();
        rateHasFlavorHashTag.setFlavorHashTag(flavorHashTag);
        rateHasFlavorHashTag.setMemberRateBeer(memberRateBeer);
        return rateHasFlavorHashTag;
    }
}