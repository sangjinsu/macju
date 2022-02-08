package com.sib.macju.domain.member;


import com.sib.macju.domain.hashtag.AromaHashTag;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Table(name = "rate_has_aroma_hash_tag")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RateHasAromaHashTag {

    @Id
    @Column(name = "rate_has_aroma_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rateHasAromaHashTagId;

    @ManyToOne
    @JoinColumn(name = "member_rate_beer_id")
    private MemberRateBeer memberRateBeer;

    @ManyToOne
    @JoinColumn(name = "aroma_hash_tag_id")
    private AromaHashTag aromaHashTag;

    public void setMemberRateBeer(MemberRateBeer memberRateBeer) {
        this.memberRateBeer = memberRateBeer;
    }

    public void setAromaHashTag(AromaHashTag aromaHashTag) {
        this.aromaHashTag = aromaHashTag;
    }

    public static RateHasAromaHashTag createRateHasAromaHashTag(AromaHashTag aromaHashTag, MemberRateBeer memberRateBeer) {
        RateHasAromaHashTag rateHasAromaHashTag = new RateHasAromaHashTag();
        rateHasAromaHashTag.setAromaHashTag(aromaHashTag);
        rateHasAromaHashTag.setMemberRateBeer(memberRateBeer);
        return rateHasAromaHashTag;
    }
}
