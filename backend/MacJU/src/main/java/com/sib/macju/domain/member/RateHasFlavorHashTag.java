package com.sib.macju.domain.member;


import com.sib.macju.domain.hashtag.FlavorHashTag;
import com.sib.macju.domain.member.MemberRateBeer;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "rate_has_flavor_hash_tag")
public class RateHasFlavorHashTag {

    @Id
    @Column(name = "rate_has_flavor_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rateHasFlavorHashTagId;

    @ManyToOne
    @JoinColumn(name = "member_rate_beer_id")
    private MemberRateBeer memberRateBeer;

    @ManyToOne
    @JoinColumn(name = "flavor_hash_tag_id")
    private FlavorHashTag flavorHashTag;

}